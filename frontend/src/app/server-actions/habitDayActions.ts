"use server";

import { upsertHabitDay } from "../services/habitDaysService";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { APIErrorResponse } from "../utils/types";

type Args = {
	habitId: string,
	timestamp: number,
	isCompleted?: boolean
}

export async function upsertHabitDayStateAction({ habitId, timestamp, isCompleted }: Args): Promise<APIErrorResponse | undefined> {
	const accessToken = await getAccessToken();
	const res = await upsertHabitDay({ accessToken, habitId, timestamp, isCompleted });
	if (!res.success) {
		return res;
	}
}

