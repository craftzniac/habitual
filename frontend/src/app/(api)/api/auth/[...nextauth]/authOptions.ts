import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AxiosError } from "axios";
import { refreshAccessToken } from "@/app/(api)/server-actions/auth";
import api from "@/app/services/api/axios.config";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error("Email or Password has not been provided");
                }

                try {
                    const { data: user } = await api.post("/auth/login", { email: credentials.email, password: credentials.password })

                    return { id: user.userId, accessToken: user.accessToken, accessTokenExpiresIn: user.accessTokenExpiresIn, refreshToken: user.refreshToken };
                } catch (err) {
                    const error = err as AxiosError;

                    let message = "Couldn't complete your request";
                    if (error.response) {
                        message = (error.response.data as any).message;
                    }

                    throw new Error(message);
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // signIn: ({ user, credentials }) => {
        //     return true;
        // },
        async jwt({ user, token }) {
            if (user) {
                token.accessToken = (user as any).accessToken as string;
                token.accessTokenExpiresIn = (user as any).accessTokenExpiresIn as string;
                token.refreshToken = (user as any).refreshToken as string
                return token;
            }

            const now = new Date();
            const currentAccessTokenExpireDate = new Date((token as any).accessTokenExpiresIn);

            console.log("now:", now, "   tokenexpireat:", currentAccessTokenExpireDate);
            // Return previous token if the access token has not expired yet
            if (now < currentAccessTokenExpireDate) {
                return token
            }
            console.log("access token expired. get new one");
            // Access token has expired, try to update it
            const res = await refreshAccessToken((token as any).refreshToken);
            if (!res.success) {
                return {
                    ...token,
                    error: res.error
                };
            }
            const { accessToken, accessTokenExpiresIn, refreshToken } = res.data;
            return {
                ...token,
                accessToken,
                accessTokenExpiresIn,
                refreshToken
            }
        },

        session({ session, token }) {
            if (token) {
                session.user.accessToken = (token.accessToken) as string;
                session.error = (token.error) as string;
            }

            return session;
        }
    },
    session: {
        maxAge: 10 * 24 * 60 * 60  // 10 days 
    }

}


