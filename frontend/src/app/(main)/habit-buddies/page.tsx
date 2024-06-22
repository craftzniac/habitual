"use client"
import { useEffect, useState } from "react"
import CircularProgressBar from "../components/CircularProgressBar"
export default function HabitBuddies() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <section className="w-full">
            {
                isClient && (
                    <CircularProgressBar />
                )
            }
        </section >
    )
}
