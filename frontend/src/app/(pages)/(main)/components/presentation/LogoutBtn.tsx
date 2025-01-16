"use client";
import { Exit_16 } from "@/app/assets/icons"
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function LogoutBtn({ alwaysShowText = false }: { alwaysShowText?: boolean }) {
    return (
        <button className={`flex items-center gap-2 justify-start hover:bg-primary-50 transition-colors duration-200 ${alwaysShowText === false ? "w-full rounded px-3 py-3 " : "min-w-fit rounded-full px-5 py-3 lg:hidden"}`} onClick={() => signOut()}>
            <Image src={Exit_16} alt="" className="w-5 h-5 lg:w-6 lg:h-6" width={16} height={16} />
            <span className={`font-bold text-sm text-primary-500 ${alwaysShowText === false ? "hidden 3xl:block " : ""}`}>Logout</span>
        </button>
    )
}
