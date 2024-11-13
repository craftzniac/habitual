"use server"
import { Habit } from "@/app/services/api/habits";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";

export async function getHabits() {
	const accessToken = await getAccessToken();
	return Habit.getHabits({ accessToken });
}
