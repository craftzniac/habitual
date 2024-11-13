import { TSignupFormInputs } from "@/app/types";
import { AxiosError } from "axios";
import api from "./axios.config";
import { CUSTOM_ERROR } from "@/app/constants";

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

	static async refreshAccessToken(refreshToken: string): Promise<
		{
			success: true,
			data: {
				accessToken: string,
				refreshToken: string, accessTokenExpiresIn: string
			}
		} | {
			success: false,
			error: string
		}
	> {
		// make request to the nestjs backend requesting for a new access token.
		try {
			const { data } = await api.post("/auth/refresh-token", {
				refreshToken
			})

			return {
				success: true, data: {
					accessToken: data.accessToken, refreshToken: data.refreshToken, accessTokenExpiresIn: data.accessTokenExpiresIn
				}
			}
		} catch (err) {
			const error = err as AxiosError;
			if (error.response) {
				return { success: false, error: CUSTOM_ERROR.REFRESH_ACCESS_TOKEN_ERROR }
			}

			return { success: false, error: CUSTOM_ERROR.REFRESH_ACCESS_TOKEN_ERROR }
		}
	}
}
