import { habitSegBtns } from "@/app/data"
import SegmentBtn from "./components/SegmentBtn";
import HabitList from "./components/HabitList";
import { redirect } from "next/navigation";

export default function Habits({ searchParams }: {
    searchParams: {
        filter: string
    }
}) {
    if (!searchParams.filter) {
        searchParams.filter = "today"
        redirect(`/habits?filter=${searchParams.filter}`)
    }

    return (
        <section className="w-full h-fit flex flex-col gap-4 px-4">
            {/* segmented buttons menu */}
            <ul className="flex gap-2 w-full overflow-x-auto thin-scrollbar">
                {
                    habitSegBtns.map(
                        segBtn => (
                            <li key={segBtn.text} className="">
                                {
                                    <SegmentBtn segBtn={segBtn} currentFilter={searchParams.filter} />
                                }
                            </li>
                        )
                    )
                }
            </ul>

            {/* habit list */}
            <HabitList filter={searchParams.filter} />
        </section>
    )
}


