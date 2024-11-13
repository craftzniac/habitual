import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		error?: string,
		user: {
			accessToken: string
		} & DefaultSession["user"]
	}
}
