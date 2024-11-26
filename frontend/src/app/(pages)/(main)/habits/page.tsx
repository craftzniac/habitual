import SegmentBtns from "./components/presentation/SegmentBtns";
import { THabitFilter } from "@/app/utils/types";
import { redirect } from "next/navigation";
import Habits from "./components/presentation/Habits";
import AddHabitBtn from "./components/presentation/AddHabitBtn";

export default async function HabitsPage({ searchParams }: { searchParams: { filter?: string } }) {
    let filter: THabitFilter;
    if (searchParams?.filter === "today" || searchParams?.filter === "on-going" || searchParams?.filter === "completed") {
        filter = searchParams.filter;
    } else {
        filter = "today"
        redirect(`/habits?filter=${filter}`)
    }
    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <header className="flex items-center px-4 py-2 gap-1 w-full">
                <h1 className="text-lg font-bold w-full">Habits</h1>
                <AddHabitBtn />
            </header>
            <main className="flex flex-col w-full h-full">
                <div className="px-4">
                    <SegmentBtns filter={filter} />
                </div>
                <div className="p-4 flex w-full h-full overflow-y-auto">
                    <Habits filter={filter} />
                </div>
            </main>
        </div>
    )
}


