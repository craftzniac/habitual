import HabitDays from "./components/logic/HabitDays";
import { getHabit } from "@/app/services/habitsService"
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken"
import ErrorPage from "../components/presentation/error-page"
import { TDayOfWeek } from "@/app/utils/types";
import { getHabitDays } from "@/app/services/habitDaysService";

type Props = {
    params: {
        id: string
    }
}

export default async function Habit({ params }: Props) {
    const id = params.id
    const accessToken = await getAccessToken();
    const [habitRes, habitDaysRes] = await Promise.all([getHabit({ accessToken, id }), getHabitDays({ accessToken, habitId: id })])
    if (habitRes.success === false) {
        return (
            <ErrorPage errorMsg={habitRes.message} />
        )
    } else if (habitDaysRes.success === false) {
        return (
            <ErrorPage errorMsg={habitDaysRes.message} />
        )
    }

    const habit = habitRes.data.habit;
    const habitDays = habitDaysRes.data.habitDays;
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
