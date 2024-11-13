import HabitDays from "./components/HabitDays"
import HabitStats from "../../components/HabitStats"
import { habits } from "@/app/data"

type Props = {
    params: {
        id: string
    }
}

export default async function Habit({ params }: Props) {
    const id = params.id
    //const habit = await fetchHabit(id)
    const habit = habits[0];
    if (habit) {
        return (
            <section className="w-full h-full flex flex-col px-4 overflow-y-auto">
                <div className="w-full flex flex-col gap-2">
                    <p>{habit.title}</p>
                    <p className="text-sm text-gray-75 leading-[1.5em]">{habit.description}</p>
                </div>
                <div className="flex flex-col py-6">
                    <HabitStats isHabitCompleted={habit.isCompleted} stats={habit.stats} variant="secondary" />
                </div>
                <HabitDays />
            </section>
        )
    }
    return (
        <section className="w-full h-fit flex flex-col gap-12 px-4">
            <h2>
                This item was not found
            </h2>
        </section>
    )
}
