"use server"
import { Auth } from "@/app/services/api/auth";
import { TSignupFormInputs } from "@/app/types";

export async function refreshAccessToken(refreshToken: string) {
	return await Auth.refreshAccessToken(refreshToken);
}

export async function signup(body: TSignupFormInputs) {
	return await Auth.signup(body);
}
