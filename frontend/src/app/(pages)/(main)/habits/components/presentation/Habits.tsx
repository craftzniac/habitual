import { THabitFilter } from "@/app/utils/types";
import ErrorPage from "../presentation/error-page";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import { getHabits } from "@/app/services/habitsService";
import HabitCard from "../../../components/presentation/HabitCard";
import { NoHabits } from "../presentation/NoHabits";

export default async function Habits({ filter }: { filter: THabitFilter }) {
    const accessToken = await getAccessToken();
    const res = await getHabits({ accessToken, filter });
    if (!res.success) {
        return (
            <ErrorPage errorMsg={res.message} />
        )
    }
    const habits = res.data.habits;
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

