"use server"
import { revalidatePath } from "next/cache";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { createHabit } from "../services/habitsService";
import { THabit } from "../utils/types";
import { navPaths } from "../utils/constants";

export async function createHabitAction(data: Omit<THabit, "id" | "userId" | "createdAt" | "updatedAt">): Promise<string | undefined> {
	// transform the Set objects to Array else the axios method from the createHabit() function won't be able to send it as an array
	const frequencyArray = Array.from(data.frequency || []);
	const remindersArray = Array.from(data.reminders || []);
	const accessToken = await getAccessToken();
	const res = await createHabit({
		accessToken,
		data: {
			...data,
			frequency: frequencyArray,
			reminders: remindersArray
		}
	});
	if (res.success) {
		revalidatePath(navPaths.HABITS.INDEX);
	} else {
		return res.message
	}
}
