import { habits } from "@/app/data"
import HabitCard from "../../components/HabitCard"

async function fetchHabits() {
    return habits
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
