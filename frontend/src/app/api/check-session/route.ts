import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (request: NextRequest) => {
    const token = await getToken({ req: request });
    if (!token) {
        return NextResponse.json({ isAuthenticated: false })
    }
    return NextResponse.json({ isAuthenticated: true })
}
