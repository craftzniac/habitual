"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";

/** 
 * a wrapper for getServerSession which also handles serverside logout. 
 * Use within server components and server actions
 * */
export async function getSessionOrSignout() {
    const session = await getServerSession(authOptions);
    if (!session || session.error) {
        redirect("/login")
    }
    return session;
}

