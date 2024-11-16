import { cookies } from "next/headers";
export function deleteSessionCookie() {
    const sessionTokenKey = `next-auth.session-token`
    const cookieStore = cookies();
    cookieStore.getAll().map(cookie => console.log("cookie:", cookie))
    cookieStore.delete(sessionTokenKey)
    // cookieStore.delete(`__Secure-${sessionTokenKey}`)
}
