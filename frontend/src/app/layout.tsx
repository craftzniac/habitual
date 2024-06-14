import type { Metadata } from "next";
import "./globals.css";
import sansFont from "./font";

export const metadata: Metadata = {
  title: "Habitual",
  description: "A habit tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`w-screen h-dvh flex text-primary-900 ${sansFont.className}`}>
        {children}
      </body>
    </html>
  );
}
