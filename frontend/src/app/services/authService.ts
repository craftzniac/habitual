import { TSignupFormInputs } from "../utils/types";
import { AxiosError } from "axios";
import api from "./axios.config";

export class Auth {
	static async signup(body: TSignupFormInputs): Promise<{
		success: true, data: {
			accessToken: string, user: any
		}
	} | { message: string, success: false }> {
		try {
			const { data, status } = await api.post("/auth/signup", body);
			return { success: true, data }
		} catch (err) {

			const error = err as AxiosError;
			const success = false;

			if (error.response) {
				const { message, statusCode } = error.response.data as { message: string, error: string, statusCode: number };
				return { success, message }
			}

			if (error.request) {
				return { success, message: "Something bad happened. Try again" }
			}

			return { success, message: "Something bad happened. Try again" }
		}
	}
}
