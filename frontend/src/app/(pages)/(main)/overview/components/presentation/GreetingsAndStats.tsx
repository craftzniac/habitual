"use client"
import { useUserContext } from "@/app/contexts/UserProvider";
import { getTimeOfDay } from "@/app/utils/helpers/tinyHelpers";
import Image from "next/image";
import {
    Day_32 as Day, Night_32 as Night
} from "@/app/assets/illustrations"
import StatsCard from "./StatsCard";
import { capitalizeEachWord } from "@/app/utils/helpers/tinyHelpers";
import { THabit } from "@/app/utils/types";

type Props = {
    ongoingHabitsCount: number
    completedHabitsCount: number,
    topHabit: Pick<THabit, "id" | "consistencyInPercent" | "name">;
}

export default function GreetingAndStats({ topHabit, ongoingHabitsCount, completedHabitsCount }: Props) {
    const { username } = useUserContext();
    const formatter = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"

    });
    const todayDate = formatter.format(new Date());
    const timeOfDay = getTimeOfDay(new Date());
    const isDay = timeOfDay !== "evening";

    return (
        <>
            {/* greeting */}
            < section className="w-full flex items-center p-4 gap-4" >
                <div className="flex flex-col w-full items-start gap-2 lg:gap-4">
                    <span className="text-lg font-bold text-gray-75 capitalize">Good {capitalizeEachWord(timeOfDay)}</span>
                    <h2 className="font-bold text-[1.69rem] lg:text-5xl">{username}</h2>
                </div>
                <div className="flex flex-col items-end min-w-max h-full justify-between gap-2 lg:gap-4">
                    <p className="text-sm lg:text-base">{todayDate}</p>
                    <Image src={
                        isDay ? Day : Night
                    } alt="" className="lg:w-12 lg:h-12" />
                </div>
            </section >
            {/* stats */}
            <section className="w-full gap-4 p-4 h-fit overview-page-stats-grid">
                <StatsCard title="On-going Habits" val={ongoingHabitsCount} gridArea="card1" />
                <StatsCard title="Completed Habits" val={completedHabitsCount} gridArea="card2" />
                <StatsCard title="Top Consistent Habit" isPercent={true} val={topHabit.consistencyInPercent} extraText={topHabit.name} gridArea="card3" />
            </section >

        </>
    )

}
