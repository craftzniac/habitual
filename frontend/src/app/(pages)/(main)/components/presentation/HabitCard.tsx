"use client"
import { THabit } from "@/app/utils/types"
import Link from "next/link"

type Prop = {
    habit: THabit,
}

export default function HabitCard({ habit }: Prop) {
    return (
        <Link href={"#"}
        >
            {habit.name}
        </Link>
    )
}



