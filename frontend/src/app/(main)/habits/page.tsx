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
        // TODO: Something weird is going on here. Adding a console.log() that prints something to this block makes the redirect() work but if I don't add the console.log() the redirect won't work. Is this some cache related issue???? But I already tried exporting dynamic = "force-dynamic" from this file. Hmmm.
        console.log("no search param, setting...");
        searchParams.filter = "today"
        redirect(`/habits?filter=${searchParams.filter}`)
    }

    return (
        <section className="w-full h-fit flex flex-col gap-4 px-4">
            {/* segmented buttons menu */}
            <ul className="flex gap-2 w-full overflow-x-auto">
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


