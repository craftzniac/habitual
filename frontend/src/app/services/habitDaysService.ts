import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader";
import { habitsServiceErrorResponse } from "../utils/helpers/habitsServiceErrorResponse";
import { APIErrorResponse, TDay, TSavedHabitDay } from "../utils/types";
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
		return habitsServiceErrorResponse(err);
	}
}
