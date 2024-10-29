import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "./app/middlewares/authenticate";
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
