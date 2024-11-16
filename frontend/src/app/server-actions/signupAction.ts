"use server"
import { Auth } from "../services/authService";
import { TSignupFormInputs } from "../utils/types";

export async function signupAction(body: TSignupFormInputs) {
	return await Auth.signup(body);
}
