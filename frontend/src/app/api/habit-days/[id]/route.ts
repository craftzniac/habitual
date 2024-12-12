import { NextResponse } from "next/server";
import { getHabitDays } from "@/app/services/habitDaysService";
import { getAccessToken } from "../../auth/[...nextauth]/getAccessToken";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const accessToken = await getAccessToken();
    const res = await getHabitDays({ accessToken, habitId: params.id });
    if (res.success) {
        return NextResponse.json(res);
    }
    return NextResponse.json(res, { status: 500 });
}
