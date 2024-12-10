"use client"
import { Arrow_Left_24 } from "@/app/assets/icons";
import Image from "next/image";
import Link from "next/link";

export default function BackButton({ href }: { href?: string }) {
    if (href) {
        return (
            <Link href={href} className="flex p-2 min-w-fit hover:bg-gray-5 rounded-full">
                <Image src={Arrow_Left_24} className="w-6 h-6" alt="arrow left" />
            </Link>

        )
    }
    return (
        <button type="button" className="flex p-2 min-w-fit hover:bg-gray-5 rounded-full" onClick={() => {
            if (window) {
                window.history.back();
            }
        }}>
            <Image src={Arrow_Left_24} className="w-6 h-6" alt="arrow left" />
        </button>

    )
}
