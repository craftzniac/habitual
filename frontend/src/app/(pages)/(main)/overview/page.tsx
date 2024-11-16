import Image from "next/image";
import {
    Day_32 as Day, Night_32 as Night
} from "@/app/assets/illustrations"
import StatsCard from "./components/presentation/StatsCard";
import { completedHabits, habits as habitsDummyData } from "@/app/utils/testData";
import FeaturedHabitsList from "./components/presentation/FeaturedHabitsList";
import { THabit } from "@/app/utils/types";


async function Overview() {
    const username = "victor123";
    const greeting = "Good Afternoon";
    const todayDate = "Sunday, 8 June 2024";
    const isDay = true;
    const habits = habitsDummyData as THabit[];

    return (
        <section className="w-full h-full flex flex-col gap-12 overflow-y-auto">
            {/* greeting */}
            <section className="w-full flex items-center p-4 gap-4">
                <div className="flex flex-col w-full items-start gap-2">
                    <span className="text-lg font-bold text-gray-75 capitalize">{greeting}</span>
                    <h2 className="font-bold text-[1.69rem]">{username}</h2>
                </div>
                <div className="flex flex-col items-end min-w-max h-full justify-between gap-2">
                    <p className="text-sm">{todayDate}</p>
                    <Image src={
                        isDay ? Day : Night
                    } alt="" />
                </div>
            </section>
            {/* stats */}
            <section className="flex flex-col w-full gap-4 p-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <StatsCard title="Habits completed today" val="3" otherVal="of 5" />
                    <StatsCard title="Completed today" val="5" />
                </div>
                <StatsCard title="Habits in-progress" val="4" />
            </section>
            {/* today habits */}
            <FeaturedHabitsList title="Today&apos;s Habits" habits={habits} />
            {/* in progress habits */}
            <FeaturedHabitsList title="Ongoing Habits" viewAllLink="/habits?in-progress" habits={habits} />
            {/* completed habits */}
            <FeaturedHabitsList title="Completed Habits" viewAllLink="/habits?completed" habits={completedHabits as THabit[]} />
        </section>
    )
}

export default Overview
