import { THabit } from "../utils/types";
import { AxiosError } from "axios";
import api from "./axios.config";

export class Habit {
	static async getHabits({ accessToken }: { accessToken: string }): Promise<{ success: true, data: THabit[] } | { success: false, message: string }> {
		try {
			const { data } = await api.get("/habits", {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			return {
				success: true,
				data
			}
		} catch (err) {
			const error = err as AxiosError;
			if (error.response) {
				const errorMsg: string = (error.response.data as any).message
				return {
					success: false,
					message: errorMsg
				}
			}

			if (error.request) {
				return {
					success: false,
					message: "Couldn't complete request"
				}
			}

			return {
				success: false,
				message: "Couldn't complete request"
			}
		}
	}
}

