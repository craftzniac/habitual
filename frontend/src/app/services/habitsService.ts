import { APIErrorResponse, TDayOfWeek, THabit, THabitFilter, TReminderTime } from "../utils/types";
import api from "./axios.config";
import { transformHabit } from "../utils/helpers/tinyHelpers";
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse";
import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader";

export async function getHabits({ accessToken, filter }: { accessToken: string, filter: THabitFilter }): Promise<{
	success: true, data: {
		habits: THabit[],
		filter: THabitFilter
	}
} | APIErrorResponse> {
	try {
		const res = await api.get(`/habits`, {
			params: {
				filter
			},
			headers: getHabitsRequestHeader(accessToken)
		});

		const habits = res.data.habits.map((h: any) => transformHabit(h));

		return {
			success: true,
			data: {
				...res.data,
				habits
			}
		}
	} catch (err) {
		return axiosErrorResponse(err);
	}
}

export async function getHabit({ accessToken, id }: {
	accessToken: string, id: string
}): Promise<
	APIErrorResponse
	| {
		success: true
		data: { habit: THabit }
	}
> {
	try {
		const res = await api.get(`/habits/${id}`, {
			headers: getHabitsRequestHeader(accessToken)
		})
		return {
			success: true,
			data: {
				...res.data,
				habit: transformHabit(res.data.habit)
			}
		}
	} catch (err) {
		return axiosErrorResponse(err);
	}
}


export async function createHabit({ accessToken, data }: {
	accessToken: string, data: Omit<THabit, "id" | "userId" | "createdAt" | "updatedAt" | "reminders" | "frequency"> & {
		reminders: TReminderTime[],
		frequency: TDayOfWeek[]
	}
}): Promise<
	APIErrorResponse | {
		success: true, data: THabit
	}
> {
	try {
		const res = await api.post(`/habits`, data, {
			headers: getHabitsRequestHeader(accessToken)
		});

		return {
			success: true,
			data: res.data
		}
	} catch (err) {
		return axiosErrorResponse(err);
	}
}



export async function deleteHabit({ accessToken, habitId }: {
	accessToken: string, habitId: string
}): Promise<
	APIErrorResponse | {
		success: true
	}
> {
	try {
		await api.delete(`/habits/${habitId}`, {
			headers: getHabitsRequestHeader(accessToken)
		});

		return {
			success: true,
		}
	} catch (err) {
		return axiosErrorResponse(err);
	}
}
