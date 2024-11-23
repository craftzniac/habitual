import { Plus_16_White } from "@/app/assets/icons";
import Button from "@/app/components/presentation/form/Button";
import Image from "next/image";
import SegmentBtns from "./components/presentation/SegmentBtns";
import { THabitFilter } from "@/app/utils/types";
import { redirect } from "next/navigation";
import Habits from "./components/logic/Habits";

export default async function HabitsPage({ searchParams }: { searchParams: { filter?: string } }) {
    let filter: THabitFilter;
    if (searchParams?.filter === "today" || searchParams?.filter === "on-going" || searchParams?.filter === "completed") {
        filter = searchParams.filter;
    } else {
        filter = "today"
        redirect(`/habits?filter=${filter}`)
    }

    return (
        <div className="h-full w-full flex flex-col">
            <header className="flex items-center px-4 py-2 gap-1 w-full">
                <h1 className="text-lg font-bold w-full">Habits</h1>
                <Button label="Add Habit">
                    <Image src={Plus_16_White} alt="plus icon" />
                </Button>
            </header>
            <main className="flex flex-col w-full h-full">
                <div className="px-4">
                    <SegmentBtns filter={filter} />
                </div>
                <Habits filter={filter} />
            </main>
        </div>
    )
}


