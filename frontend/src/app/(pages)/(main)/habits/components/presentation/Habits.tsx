import { THabit, THabitFilter } from "@/app/utils/types";
import HabitCard from "../../../components/presentation/HabitCard";
import { NoHabits } from "../presentation/NoHabits";

export default async function Habits({ habits, filter }: { habits: THabit[], filter?: THabitFilter }) {
    return (
        habits.length === 0 ? (
            <section className="h-full w-full flex justify-center items-center">
                <NoHabits filter={filter} />
            </section>
        ) : (
            <section className="habits">
                <ul>
                    {
                        habits.map(habit => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                            />
                        ))
                    }
                </ul>
            </section>
        )
    )
}

