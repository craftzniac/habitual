"use server"
import { revalidatePath } from "next/cache";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { createHabit, editHabit } from "../services/habitsService";
import { THabit } from "../utils/types";
import { navPaths } from "../utils/constants";
import { deleteHabit } from "../services/habitsService";

/**
 * deletes a habit. 
 * @returns an error message if delete failed 
 * */
export async function deleteHabitAction(habitId: string): Promise<string | undefined> {
	const accessToken = await getAccessToken();
	const res = await deleteHabit({ accessToken, habitId });
	if (res.success) {
		revalidatePath(navPaths.HABITS.INDEX);
	} else {
		return res.message
	}
}

export async function createHabitAction(data: Omit<THabit, "id" | "userId" | "createdAt" | "updatedAt" | "status" | "consistencyInPercent">): Promise<string | undefined> {
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


export async function editHabitAction(data: Omit<THabit, "userId" | "createdAt" | "updatedAt" | "status" | "consistencyInPercent">): Promise<string | undefined> {
	const frequencyArray = Array.from(data.frequency || []);
	const remindersArray = Array.from(data.reminders || []);

	const accessToken = await getAccessToken();
	const res = await editHabit({
		accessToken,
		data: {
			...data,
			frequency: frequencyArray,
			reminders: remindersArray
		}
	});
	if (res.success) {
		revalidatePath(navPaths.HABITS.INDEX);
		revalidatePath(`${navPaths.HABITS.INDEX}/${data.id}`);
	} else {
		return res.message
	}
}
