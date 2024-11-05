"use server"

import { AxiosError } from "axios";
import api from "../axiosConfig"
import { Habit } from "../types";
import { getAccessToken } from "./utils";

export async function getHabits(): Promise<{ success: true, data: Habit[] } | { success: false, message: string }> {
	const accessToken = await getAccessToken();
	try {
		const { data } = await api.get("/habits", {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		return {
			success: true,
			data
		}
	} catch (err) {
		const error = err as AxiosError;
		if (error.response) {
			const errorMsg: string = (error.response.data as any).message
			return {
				success: false,
				message: errorMsg
			}
		}

		if (error.request) {
			return {
				success: false,
				message: "Couldn't complete request"
			}
		}

		return {
			success: false,
			message: "Couldn't complete request"
		}
	}
}
