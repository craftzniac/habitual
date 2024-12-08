import Image from "next/image";

import Link from "next/link"
import HabitDays from "./components/presentation/HabitDays"
import { getHabit } from "@/app/services/habitsService"
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken"
import ErrorPage from "../components/presentation/error-page"
import { Arrow_Left_24 } from "@/app/assets/icons";
import { navPaths } from "@/app/utils/constants";
import { TDayOfWeek } from "@/app/utils/types";
import { getHabitDays } from "@/app/services/habitDaysService";
import OverflowButton from "./components/presentation/OverflowButton";
import BackButton from "../../components/presentation/BackButton";

type Props = {
    params: {
        id: string
    }
}

export default async function Habit({ params }: Props) {
    const id = params.id
    const accessToken = await getAccessToken();
    const [habitRes, habitDaysRes] = await Promise.all([getHabit({ accessToken, id }), getHabitDays({ accessToken, habitId: id })])
    // const res = await getHabit({ accessToken, id });
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
    console.log("habitdays:", habitDays);
    return (
        <section className="h-full w-full flex flex-col">
            <header className="flex items-center px-2 py-2 w-full gap-1">
                <BackButton href={navPaths.HABITS.INDEX} />
                <h1 className="text-lg font-bold w-full line-clamp-1">{habit.name}</h1>
                <OverflowButton habitId={habit.id} />
            </header>

            <main className="w-full h-full flex flex-col px-4 overflow-y-auto">
                <HabitDays
                    savedHabitDays={habitDays}
                    habitId={habit.id}
                    startDate={habit.startDate}
                    frequency={Array.from(habit.frequency as Set<TDayOfWeek>)}
                    durationInDays={habit.durationInDays}
                />
            </main>
        </section>

    )
}
