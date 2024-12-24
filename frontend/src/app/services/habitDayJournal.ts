import api from "./axios.config"
import { APIErrorResponse } from "../utils/types"
import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader"
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse"

export async function getJournalEntryFor({ accessToken, date, habitId }: { accessToken: string, date: string, habitId: string }): Promise<APIErrorResponse | {
	success: true,
	data: {
		entry: {
			note: string,
			id?: string,
			date: string
		}
	}
}> {
	try {
		const res = await api.get(`/habits/${habitId}/habit-days/${date}/journal-entry`, {
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
		if (ex.status === 404) {
			return {
				success: true,
				data: {
					entry: {
						note: "",
						date
					}
				}
			}
		}

		return ex;
	}
}
