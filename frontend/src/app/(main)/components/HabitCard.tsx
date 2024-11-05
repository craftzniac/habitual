"use client"
import { Habit } from "@/app/types"
import Link from "next/link"
import CircularProgressBar from "./CircularProgressBar"
import HabitStats from "./HabitStats"

type Prop = {
    habit: Habit,
}

export default function HabitCard({ habit }: Prop) {
    return (
        <Link href={"#"}
        >
            {habit.name}
        </Link>
    )
}



