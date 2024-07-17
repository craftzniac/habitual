"use client"
import { Habit } from "@/app/types"
import Link from "next/link"
import CircularProgressBar from "./CircularProgressBar"
import HabitStats from "./HabitStats"

type Prop = {
    habit: Habit,
    showStats: boolean,
    variant?: "primary" | "secondary"
}

export default function HabitCard({ habit, showStats = true, variant = "primary" }: Prop) {
    const completionRate = Math.round(
        ((habit.stats.numberOfHabitDays - habit.stats.numberOfRemainingDays) / (habit.stats.numberOfHabitDays)) * 100
    )

    return (
        <Link
            href={`/habits/${habit.id}`}
            className={`flex flex-col gap-2 bg-gray-2 rounded-2xl border-2 border-primary-100 ${variant === "primary" ? "p-4" : (
                variant === "secondary" ? "p-3" : ""
            )}`}>
            <div className="flex gap-4 items-start">
                <div className="w-full">
                    <p className={`line-clamp-2 ${variant === "primary" ? "font-bold" : (variant === "secondary" ? "" : "")}`}>{habit.title}</p>
                    <p className={`text-gray-75 ${variant === "primary" ? "line-clamp-2 text-sm" : (variant === "secondary" ? "line-clamp-4 text-xs" : "")}`}>{habit.description}</p>
                </div>
                <CircularProgressBar value={completionRate} />
            </div>
            {
                showStats && (
                    <HabitStats stats={habit.stats} isHabitCompleted={habit.isCompleted} />
                )
            }
        </Link>
    )
}



