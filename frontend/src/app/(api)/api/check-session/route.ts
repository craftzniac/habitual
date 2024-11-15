import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { deleteSessionCookie } from "../auth/[...nextauth]/deleteSessionCookie";

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    console.log("session.error:", session?.error);
    if (!session) {
        return NextResponse.json({ isAuthenticated: false })
    }

    if (session.error) {
        deleteSessionCookie();
        return NextResponse.json({ isAuthenticated: false })
    }

    return NextResponse.json({ isAuthenticated: true })
}
