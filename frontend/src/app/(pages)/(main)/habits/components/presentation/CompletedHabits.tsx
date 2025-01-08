import { THabit, THabitFilter, TSavedHabitDay } from "@/app/utils/types";
import HabitCard from "../../../components/presentation/HabitCard";
import { NoHabits } from "../presentation/NoHabits";
import { getHabitDays } from "@/app/services/habitDaysService";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import ErrorPage from "./error-page";

export default async function CompletedHabits({ habits: _habits, filter }: { habits: THabit[], filter?: THabitFilter }) {
    if (_habits.length === 0) {
        return (
            <section className="h-full w-full flex justify-center items-center">
                <NoHabits filter={filter} />
            </section>
        )
    }

    const accessToken = await getAccessToken();
    const promiseArray = _habits.map(habit => getHabitDays({ accessToken, habitId: habit.id }))
    const ress = await Promise.all(promiseArray);

    const habits: (typeof _habits[number] & { savedHabitDays: TSavedHabitDay[] })[] = [];
    let errorMsg = "";
    // check if any errors
    for (let i = 0; i < ress.length; i++) {
        const res = ress[i];
        if (res.success === false) {
            errorMsg = res.message;
            break;
        } else {
            // associate the habit days to it's habit 
            habits.push({ ..._habits[i], savedHabitDays: res.data.habitDays });
        }
    }

    if (errorMsg) {
        return (
            <ErrorPage errorMsg={errorMsg} />
        )
    }

    return (
        <section className="habits">
            <ul>
                {
                    habits.map(habit => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            savedHabitDays={habit.savedHabitDays}
                        />
                    ))
                }
            </ul>
        </section>
    )
}

