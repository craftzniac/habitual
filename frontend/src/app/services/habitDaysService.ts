import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader";
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse";
import { APIErrorResponse, TSavedHabitDay } from "../utils/types";
import api from "./axios.config";

export async function getHabitDays({ accessToken, habitId }: {
	accessToken: string, habitId: string
}): Promise<APIErrorResponse | {
	success: true,
	data: {
		habitId: string,
		habitDays: TSavedHabitDay[]
	}
}> {
	try {
		const res = await api.get(`/habits/${habitId}/habit-days`, {
			headers: getHabitsRequestHeader(accessToken)
		})
		return { success: true, data: res.data };
	} catch (err) {
		return axiosErrorResponse(err);
	}
}

export async function upsertHabitDay({ accessToken, habitId, timestamp, isCompleted }: {
	accessToken: string,
	habitId: string,
	timestamp: number,
	isCompleted?: boolean,
}): Promise<APIErrorResponse | {
	success: true,
}> {
	try {
		await api.put(`/habits/${habitId}/habit-days`, {
			timestamp,
			isCompleted,
		}, {
			headers: getHabitsRequestHeader(accessToken)
		})
		return { success: true };
	} catch (err) {
		return axiosErrorResponse(err);
	}
}
