"use server"
import { Auth } from "@/app/services/api/auth";
import { TSignupFormInputs } from "@/app/types";

export async function signup(body: TSignupFormInputs) {
	return await Auth.signup(body);
}
