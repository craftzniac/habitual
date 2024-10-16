import { habits } from "@/app/data"
import HabitCard from "../../components/HabitCard"
import { Habit } from "@/app/types";

async function fetchHabits() {
    return habits as Habit[];
}

export default async function HabitList({ filter }: { filter: string }) {
    const habits = await fetchHabits()
    return (
        <ul className="flex flex-col gap-4 w-full h-full">
            {
                habits.map(habit => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        showStats={false}
                    />
                ))
            }
        </ul>
    )
}
