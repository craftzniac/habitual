import Image from "next/image";
import {
    Day_32 as Day, Night_32 as Night
} from "@/app/assets/illustrations"
import StatsCard from "./components/presentation/StatsCard";
import Habits from "../habits/components/presentation/Habits";
import { Suspense } from "react";
import Loading from "@/app/components/presentation/Loading";


async function Overview() {
    return (
        <section className="h-full w-full flex flex-col overflow-hidden">
            <header className="flex items-center px-4 py-4 gap-1 w-full">
                <h1 className="text-lg font-bold w-full">Overview</h1>
            </header>
            <main className="w-full h-full flex flex-col gap-12 overflow-y-auto">
                <GreetingAndStats />

                {/* today habits */}

                <section className="flex flex-col gap-8 w-full p-4">
                    <h3 className="font-bold text-lg w-full">Today&apos;s Habits</h3>
                    <Suspense fallback={<Loading />}>
                        <Habits filter="today" />
                    </Suspense>
                </section>


                {/* in progress habits */}

                <section className="flex flex-col gap-8 w-full p-4">
                    <h3 className="font-bold text-lg w-full">On-going Habits</h3>
                    <Suspense fallback={<Loading />}>
                        <Habits filter="on-going" />
                    </Suspense>
                </section>


                {/*completed habits*/}
                <section className="flex flex-col gap-8 w-full p-4">
                    <h3 className="font-bold text-lg w-full">Completed Habits</h3>
                    <Suspense fallback={<Loading />}>
                        <Habits filter="completed" />
                    </Suspense>
                </section>
            </main>
        </section>
    )
}

function GreetingAndStats() {
    const username = "craftzniac";
    const greeting = "Good Afternoon";
    const todayDate = "Sunday, 8 June 2024";
    const isDay = true;

    return (
        <>
            {/* greeting */}
            < section className="w-full flex items-center p-4 gap-4" >
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
            </section >
            {/* stats */}
            < section className="flex flex-col w-full gap-4 p-4 h-fit" >
                <div className="grid grid-cols-2 gap-4 w-full">
                    <StatsCard title="Habits completed today" val="3" otherVal="of 5" />
                    <StatsCard title="Completed today" val="5" />
                </div>
                <StatsCard title="Habits in-progress" val="4" />
            </section >

        </>
    )

}

export default Overview
