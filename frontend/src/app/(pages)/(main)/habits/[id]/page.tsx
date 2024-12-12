"use client";
import HabitDays from "./components/logic/HabitDays";
import { TDayOfWeek } from "@/app/utils/types";
import { useGlobalContext } from "../../contexts/GlobalProvider";

export default function Habit() {
    const { habit, habitDays } = useGlobalContext();
    return (
        <section className="w-full h-full flex flex-col px-4 overflow-y-auto">
            <HabitDays
                savedHabitDays={habitDays}
                habitId={habit.id}
                startDate={habit.startDate}
                frequency={Array.from(habit.frequency as Set<TDayOfWeek>)}
                durationInDays={habit.durationInDays}
            />
        </section>
    )
}
