"use server"

import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { updateHabitDayJournalEntry } from "../services/habitDayJournal";

export async function updateJournalEntryAction({ habitId, note, date }: { habitId: string, date: string, note: string }) {
	const accessToken = await getAccessToken();
	const res = await updateHabitDayJournalEntry({ accessToken, habitId, date, note });
	console.log("result: ", res);
	return res;
}
