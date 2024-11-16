"use client"
import Image from "next/image"
import { Arrow_Left_24 } from "@/app/assets/icons"

export default function BackButton() {
    return (
        <button type="button" onClick={() => {
            window.history.back()
        }}>
            <Image src={Arrow_Left_24} className="min-w-6" alt="" />
        </button >
    )
}
