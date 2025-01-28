import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AxiosError } from "axios";
import api from "@/app/services/axios.config";

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

                    return {
                        id: user.userId,
                        accessToken: user.accessToken,
                        accessTokenExpiresIn: user.accessTokenExpiresIn,
                    };
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
        // NOTE: Somehow, returning baseUrl prevents nextauth from routing to the /login when router.push("/overview") after successful signup
        redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ user, token }) {
            if (user) {
                token.accessToken = (user as any).accessToken as string;
                token.accessTokenExpiresIn = (user as any).accessTokenExpiresIn as string;
                token.error = undefined;
                return token;
            }

            const now = new Date();
            const currentAccessTokenExpireDate = new Date((token as any).accessTokenExpiresIn);

            // console.log("now:", now, "   tokenexpireat:", currentAccessTokenExpireDate);
            // Return previous token if the access token has not yet expired
            if (now < currentAccessTokenExpireDate) {
                return {
                    ...token,
                    error: undefined
                }
            }
            return {
                ...token,
                error: "token_expired"
            }
        },

        async session({ session, token }) {
            session.user.accessToken = (token.accessToken) as string;
            session.error = (token.error) as string;
            return session;
        }
    },
    session: {
        maxAge: 10 * 24 * 60 * 60  // 10 days 
    }

}


