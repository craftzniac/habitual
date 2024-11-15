"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";
import { deleteSessionCookie } from "./deleteSessionCookie";

/** 
 * a wrapper for getServerSession which also handles serverside logout. 
 * Use within server components and server actions
 * */
export async function getSessionOrSignout() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login")
    }

    if (session.error) {
        deleteSessionCookie();
        redirect("/login")
    }
    return session;
}

