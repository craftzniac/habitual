"use server";

import { Auth } from "../services/authService";
import { getAccessToken } from "../api/auth/[...nextauth]/getAccessToken";

export default async function updateUsername(username: string): Promise<false | string> {
	const accessToken = await getAccessToken();
	const res = await Auth.updateUsername({ accessToken, username });
	if (res.success) {
		return res.username;
	}
	return false;
}
