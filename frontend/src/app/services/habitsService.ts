import { THabit, THabitFilter } from "../utils/types";
import { AxiosError } from "axios";
import api from "./axios.config";

export async function getHabits({ accessToken, filter }: { accessToken: string, filter: THabitFilter }): Promise<{
	success: true, data: {
		habits: THabit[],
		filter: THabitFilter
	}
} | { success: false, message: string }> {
	try {
		const res = await api.get(`/habits`, {
			params: {
				filter
			},
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return {
			success: true,
			data: res.data
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

		return {
			success: false,
			message: "Couldn't complete request"
		}
	}
}
