import api from "./axios.config"
import { APIErrorResponse } from "../utils/types"
import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader"
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse"
import { getUTCDateString } from "../utils/helpers/tinyHelpers"

export async function getJournalEntryFor({ accessToken, timestamp, habitId }: { accessToken: string, timestamp: number, habitId: string }): Promise<APIErrorResponse | {
	success: true,
	data: {
		entry: {
			note: string,
			timestamp: number
		}
	}
}> {
	try {
		const date = getUTCDateString(new Date(timestamp));
		const res = await api.get(`/habits/${habitId}/habit-days/${date}/journal-entry`, {
			headers: getHabitsRequestHeader(accessToken)
		});
		return {
			success: true,
			data: {
				entry: res.data
			}
		}
	} catch (err) {
		const ex = axiosErrorResponse(err);
		if (ex.status === 404) {
			return {
				success: true,
				data: {
					entry: {
						note: "",
						timestamp
					}
				}
			}
		}

		return ex;
	}
}


export async function updateHabitDayJournalEntry({ accessToken, date, habitId, note }: { accessToken: string, date: string, habitId: string, note: string }): Promise<APIErrorResponse | {
	success: true,
	data: {
		entry: {
			note: string,
			timestamp: number
		}
	}
}> {
	try {
		const res = await api.patch(`/habits/${habitId}/habit-days/${date}/journal-entry`, {
			headers: getHabitsRequestHeader(accessToken)
		});
		return {
			success: true,
			data: {
				entry: res.data.entry
			}
		}
	} catch (err) {
		const ex = axiosErrorResponse(err);
		return ex;
	}
}
