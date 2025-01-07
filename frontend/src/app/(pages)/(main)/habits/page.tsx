import SegmentBtns from "./components/presentation/SegmentBtns";
import { THabitFilter } from "@/app/utils/types";
import { redirect } from "next/navigation";
import Habits from "./components/presentation/Habits";
import AddHabitBtn from "./components/presentation/AddHabitBtn";
import ErrorPage from "./components/presentation/error-page";
import { getHabits } from "@/app/services/habitsService";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import CompletedHabits from "./components/presentation/CompletedHabits";

export const dynamic = "force-dynamic";

export default async function HabitsPage({ searchParams }: { searchParams: { filter?: string } }) {
    let filter: THabitFilter;
    if (searchParams?.filter === "today" || searchParams?.filter === "on-going" || searchParams?.filter === "completed") {
        filter = searchParams.filter;
    } else {
        filter = "today"
        redirect(`/habits?filter=${filter}`)
    }

    const accessToken = await getAccessToken();
    const res = await getHabits({ accessToken, filter });

    return (
        <section className="flex flex-col h-full w-full">
            <header className="flex items-center px-4 pt-4 pb-2 gap-1 w-full">
                <h1 className="text-lg font-bold w-full">Habits</h1>
                <AddHabitBtn />
            </header>
            <main className="flex flex-col w-full h-full min-h-0">
                <div className="px-4 pb-2">
                    <SegmentBtns filter={filter} />
                </div>
                {
                    res.success === false ? (
                        <ErrorPage errorMsg={res.message} />
                    ) : (
                        <div className="p-4 flex w-full h-full overflow-y-auto">
                            {
                                filter === "completed" ? (
                                    <CompletedHabits habits={res.data.habits} />
                                ) : (
                                    <Habits habits={res.data.habits} />
                                )
                            }
                        </div>
                    )
                }
            </main>
        </section>
    )
}
