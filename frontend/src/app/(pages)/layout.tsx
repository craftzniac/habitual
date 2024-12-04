import type { Metadata } from "next";
import "./globals.css";
import sansFont from "../utils/font";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import SessionProvider from "../contexts/SessionProvider";
import { ToastProvider } from "../components/logic/toast";

export const metadata: Metadata = {
  title: "Habitual",
  description: "A habit tracking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`w-screen h-dvh relative flex text-primary-900 ${sansFont.className}`}>
        <SessionProvider session={session}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
