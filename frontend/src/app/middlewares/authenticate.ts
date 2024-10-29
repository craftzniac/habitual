import { NextRequest } from "next/server";
import { baseUrl } from "../constants";

/**
 * Check that this request was sent with a valid authentication cookie 
 * */
export async function authenticate(request: NextRequest): Promise<boolean> {
	// hit an api ednpoing that calls getServerSession on the request
	const res = await (await fetch(`${baseUrl}/api/check-session`, {
		headers: request.headers,
	})).json();
	return res.isAuthenticated;
}
