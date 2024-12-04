import Image from "next/image";
import { THabitFilter } from "@/app/utils/types";
import ErrorPage from "../presentation/error-page";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import { getHabits } from "@/app/services/habitsService";
import HabitCard from "../../../components/presentation/HabitCard";
import { No_Habits } from "@/app/assets/illustrations"
import { NoHabits } from "../presentation/NoHabits";

export default async function Habits({ filter }: { filter: THabitFilter }) {
    const accessToken = await getAccessToken();
    const res = await getHabits({ accessToken, filter });
    if (!res.success) {
        return (
            <ErrorPage errorMsg={res.message} />
        )
    }
    const habits = res.data.habits.slice(0, -1);
    return (
        habits.length === 0 ? (
            <section className="h-full w-full flex justify-center items-center">
                <NoHabits filter={filter} />
            </section>
        ) : (
            <section className="w-full h-fit flex flex-col gap-4">
                <ul className="grid grid-cols-1 mds:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 w-full h-fit">
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

