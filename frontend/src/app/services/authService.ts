import { APIErrorResponse, TSignupFormInputs } from "../utils/types";
import api from "./axios.config";
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse";
import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader";

export class Auth {
	static async signup(body: TSignupFormInputs): Promise<{
		success: true, data: {
			accessToken: string, user: any
		}
	} | APIErrorResponse> {
		try {
			const { data } = await api.post("/auth/signup", body);
			return { success: true, data }
		} catch (err) {
			return axiosErrorResponse(err);
		}
	}

	static async updateUsername({ accessToken, username }: { accessToken: string, username: string }): Promise<{
		success: true, username: string
	} | APIErrorResponse> {
		try {
			const { data } = await api.patch("/auth/username", { username }, {
				headers: getHabitsRequestHeader(accessToken),
			});
			return { success: true, username: data.user.username }
		} catch (err) {
			return axiosErrorResponse(err);
		}
	}


	static async getUserData({ accessToken }: { accessToken: string }): Promise<{
		success: true, username: string, id: string, email: string, profileImage: string
	} | APIErrorResponse> {
		try {
			const { data: user } = await api.get("/auth/me", {
				headers: getHabitsRequestHeader(accessToken),
			});
			return {
				success: true,
				username: user.username,
				id: user.id,
				email: user.email,
				profileImage: user.profileImage
			}
		} catch (err) {
			return axiosErrorResponse(err);
		}
	}
}
