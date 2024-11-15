import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./app/constants";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith("/overview")
    || path.startsWith("/habits")
    || path.startsWith("/settings")
  ) {
    const isAuthenticated = await authenticate(request);
    if (isAuthenticated) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", baseUrl));
    }
  }
}


/**
 * Check that this request was sent with a valid authentication cookie 
 * */
async function authenticate(request: NextRequest): Promise<boolean> {
  // hit an api ednpoint that calls getServerSession on the request
  const res = await (await fetch(`${baseUrl}/api/check-session`, {
    headers: request.headers,
  })).json();
  return res.isAuthenticated;
}
