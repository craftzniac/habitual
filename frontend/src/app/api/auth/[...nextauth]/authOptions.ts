import { NextAuthOptions } from "next-auth";
import api from "@/app/axiosConfig";
import Credentials from "next-auth/providers/credentials";
import { AxiosError } from "axios";

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

                    console.log("accesstoken:", user.accessToken);

                    return { id: user.userId, accessToken: user.accessToken };
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
        jwt({ user, token }) {
            if (user) {
                token.accessToken = (user as unknown as any).accessToken as string;
            }

            return token;
        },
        session({ session, token }) {
            session.user.accessToken = (token.accessToken) as string;
            return session;
        }
    },
    jwt: {
        maxAge: 2 * 24 * 60 * 60  // 2 days
    }

}
