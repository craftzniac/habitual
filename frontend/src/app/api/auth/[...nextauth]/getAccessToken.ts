"use server"
import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * retrieves the nestjs backend api access token from the nextauth session
 * */
export async function getAccessToken(): Promise<string> {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}
	const accessToken = session.user.accessToken;
	return accessToken
}
