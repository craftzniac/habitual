import Image from "next/image";
import Link from "next/link";
import Habits from "../habits/components/presentation/Habits";
import { Angle_Right_16 } from "@/app/assets/icons";
import GreetingAndStats from "./components/presentation/GreetingsAndStats";
import UserProfileBtn from "../components/presentation/UserProfileBtn";
import { getHabits } from "@/app/services/habitsService";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import ErrorPage from "../habits/components/presentation/error-page";
import { THabit } from "@/app/utils/types";
import { NoHabits } from "../habits/components/presentation/NoHabits";
import CompletedHabits from "../habits/components/presentation/CompletedHabits";

export default async function Overview() {
    const accessToken = await getAccessToken();
    const [resToday, resOngoing, resCompleted] = await Promise.all([
        getHabits({ accessToken, filter: "today" }),
        getHabits({ accessToken, filter: "on-going" }),
        getHabits({ accessToken, filter: "completed" }),
    ]);

    return (
        <section className="h-full w-full flex flex-col overflow-hidden">
            <header className="flex items-center px-4 py-4 gap-1 w-full">
                <h1 className="text-lg font-bold w-full">Overview</h1>
                <UserProfileBtn variant="short" />
            </header>
            {
                (resToday.success === false || resOngoing.success === false || resCompleted.success === false) ? (
                    <ErrorPage errorMsg="Couldn't get page data" />
                ) : (
                    [...resOngoing.data.habits, ...resCompleted.data.habits].length === 0 ? (
                        <NoHabits />
                    ) : (
                        <Main
                            completedHabits={resCompleted.data.habits}
                            ongoingHabits={resOngoing.data.habits}
                            todayHabits={resToday.data.habits}
                        />

                    )
                )
            }
        </section>
    )
}

function getTopHabit(habits: THabit[]): Pick<THabit, "id" | "consistencyInPercent" | "name"> {
    let topHabit = { consistencyInPercent: habits[0].consistencyInPercent, name: habits[0].name, id: habits[0].id };
    habits.forEach(habit => {
        if (habit.consistencyInPercent > topHabit.consistencyInPercent) {
            topHabit = { id: habit.id, consistencyInPercent: habit.consistencyInPercent, name: habit.name };
        }
    })
    return topHabit;
}

function Main({ todayHabits, ongoingHabits, completedHabits }: {
    todayHabits: THabit[],
    ongoingHabits: THabit[],
    completedHabits: THabit[],
}) {
    const allHabits = [...completedHabits, ...ongoingHabits];
    const topHabit = getTopHabit(allHabits);

    const limit = 3;
    let ongoingHabitsShowcaseList;
    let completedHabitsShowcaseList;

    if (ongoingHabits.length > limit) {
        ongoingHabitsShowcaseList = ongoingHabits.slice(0, limit);
    } else {
        ongoingHabitsShowcaseList = [...ongoingHabits];
    }


    if (completedHabits.length > limit) {
        completedHabitsShowcaseList = completedHabits.slice(0, limit);
    } else {
        completedHabitsShowcaseList = [...completedHabits];
    }

    return (
        <main className="w-full h-full flex flex-col gap-12 overflow-y-auto lg:flex-row lg:gap-0">
            <section className="flex flex-col gap-12 w-full h-fit lg:overflow-y-auto lg:h-full">
                <GreetingAndStats ongoingHabitsCount={ongoingHabits.length} completedHabitsCount={completedHabits.length} topHabit={topHabit} />

                {/* today habits */}
                <section className="flex flex-col gap-4 md:gap-8 w-full p-4">
                    <h3 className="font-bold text-lg w-full">Today&apos;s Habits</h3>
                    <Habits habits={todayHabits} />
                </section>
            </section>

            <section className="flex flex-col gap-12 w-full lg:overflow-y-auto lg:h-full lg:max-w-screen-sm">
                {/* in progress habits */}

                <section className="flex flex-col gap-4 md:gap-8 w-full p-4">
                    <div className="flex gap-2 items-center">
                        <h3 className="font-bold text-lg w-full">On-going Habits</h3>
                        <Link href="/habits?filter=on-going" className="min-w-fit rounded-full hover:bg-primary-500/5 flex items-center gap-1 px-4 py-2 group">
                            <span className="text-primary-500 text-sm font-bold">View all</span>
                            <Image src={Angle_Right_16} className="group-hover:translate-x-1 transition-all duration-200" alt="right angle icon" />
                        </Link>
                    </div>
                    <Habits habits={ongoingHabitsShowcaseList} />
                </section>

                {/*completed habits*/}
                <section className="flex flex-col gap-4 md:gap-8 w-full p-4">
                    <div className="flex gap-2 items-center">
                        <h3 className="font-bold text-lg w-full">Completed Habits</h3>
                        <Link href="/habits?filter=completed" className="min-w-fit rounded-full hover:bg-primary-500/5 flex items-center gap-1 px-4 py-2 group">
                            <span className="text-primary-500 text-sm font-bold">View all</span>
                            <Image src={Angle_Right_16} className="group-hover:translate-x-1 transition-all duration-200" alt="right angle icon" />
                        </Link>
                    </div>
                    <CompletedHabits habits={completedHabitsShowcaseList} />
                </section>
            </section>
        </main>
    )

}
