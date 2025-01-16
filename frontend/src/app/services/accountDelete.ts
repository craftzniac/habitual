import api from "./axios.config";
import { axiosErrorResponse } from "../utils/helpers/axiosErrorResponse";
import { getHabitsRequestHeader } from "../utils/helpers/getHabitsRequestHeader";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";
import { APIErrorResponse } from "../utils/types";

export async function deleteAccount(): Promise<{ success: true } | APIErrorResponse> {
	try {
		const accessToken = await getAccessToken();
		await api.delete(`/auth/account/delete`, {
			headers: getHabitsRequestHeader(accessToken)
		});
		return { success: true }
	} catch (err) {
		const errorRes = axiosErrorResponse(err);
		errorRes.message = "Account Delete failed"
		return errorRes
	}

}
