"use server";

import { upsertHabitDay } from "../services/habitDaysService";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { APIErrorResponse } from "../utils/types";

export async function upsertHabitDayStateAction({ habitId, date, isCompleted, id }: { habitId: string, date: string, isCompleted?: boolean, id?: string }): Promise<APIErrorResponse | undefined> {
	const accessToken = await getAccessToken();
	const res = await upsertHabitDay({ accessToken, habitId, date, isCompleted, id });
	if (!res.success) {
		return res;
	}
}

