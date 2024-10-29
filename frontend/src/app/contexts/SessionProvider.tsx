"use client"

import { ReactNode } from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

export default function SessionProvider({ children, session }: { children: ReactNode, session: Session | null }) {
  return (
    <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
  )
}
