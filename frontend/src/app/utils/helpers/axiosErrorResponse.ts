import { AxiosError } from "axios";
import { APIErrorResponse } from "../types";

export function axiosErrorResponse(err: any): APIErrorResponse {
	const error = err as AxiosError;
	if (error.response) {
		const errorMsg: string = (error.response.data as any).message
		return {
			success: false,
			message: errorMsg,
			status: error.response.status
		}
	}

	return {
		success: false,
		message: "Couldn't complete request",
	}
}
