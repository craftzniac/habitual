import { TDayOfWeek, THabit, THabitFilter, TReminderTime } from "../utils/types";
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


export async function createHabit({ accessToken, data }: {
	accessToken: string, data: Omit<THabit, "id" | "userId" | "createdAt" | "updatedAt" | "reminders" | "frequency"> & {
		reminders: TReminderTime[],
		frequency: TDayOfWeek[]
	}
}): Promise<
	{ success: false, message: string } | {
		success: true, data: THabit
	}
> {
	try {
		const res = await api.post(`/habits`, data, {
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
