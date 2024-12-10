import React, { ReactNode } from "react";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import ErrorPage from "../components/presentation/error-page";
import { getHabit } from "@/app/services/habitsService";
import Header from "./components/logic/Header";
import HabitInfo from "./components/presentation/HabitInfo";
import { getHabitDays } from "@/app/services/habitDaysService";

export default async function HabitDetailsLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
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
        <section className="h-full w-full flex flex-col">
            <Header habitId={habit.id} habitName={habit.name} />
            <main className="w-full h-full min-h-0 flex">
                <div className="w-full h-full flex">
                    {children}
                </div>
                <section className="hidden 2xl:flex w-full h-full pe-4 ps-1 overflow-y-auto max-w-[25rem]">
                    <HabitInfo habitDays={habitDays} habit={habit} />
                </section>
            </main>
        </section>
    )
}
