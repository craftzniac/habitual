"use client"
import { navPaths } from "@/app/data"
import { usePathname, useParams } from "next/navigation"
import AddHabitBtn from "../habits/components/AddHabitBtn"
import BackButton from "./BackButton"
import OverflowButton from "../habits/[id]/components/OverflowButton"

type Params = {
    id: string
}

export default function Header() {
    const path = usePathname()
    const params = useParams() as Params

    if (path.startsWith(navPaths.OVERVIEW)) {
        return (
            <header className="flex p-4 items-center justify-between">
                <h1 className="font-bold text-lg">Overview</h1 >
            </header>
        )
    }

    if (path.startsWith(navPaths.HABITS.INDEX)) {
        if (path === navPaths.HABITS.INDEX) {
            return (
                <header className="flex p-4 items-center justify-between gap-2">
                    <h1 className="font-bold text-lg">Habits</h1 >
                    <AddHabitBtn />
                </header>
            )
        }

        if (path === navPaths.HABITS.NEW) {
            return (
                <header className="flex p-4 items-center justify-between gap-2">
                    <BackButton />
                    <h1 className="font-bold text-lg w-full">Add new Habit</h1 >
                </header>
            )
        }

        //else case will satisfy /habits/:id
        const id = params.id
        return (
            <header className="flex p-4 items-center justify-between gap-2">
                <BackButton />
                <h1 className="font-bold text-lg line-clamp-1 w-full">Reading cal newport&apos;s &quot;So good they can&apos;t ignore you&quot;</h1>
                {path === `${navPaths.HABITS.INDEX}/${id}` && <OverflowButton habitId={id} />}
            </header>
        )
    }

    if (path.startsWith(navPaths.HABIT_BUDDIES)) {
        return (
            <header className="flex p-4 items-center justify-between">
                <h1 className="font-bold text-lg">Habits Buddies</h1 >
            </header>
        )
    }

    if (path.startsWith(navPaths.SETTINGS)) {
        return (
            <header className="flex p-4 items-center justify-between">
                <h1 className="font-bold text-lg">Settings</h1 >
            </header>
        )
    }

    return (
        <header className="flex p-4 items-center justify-between">
            Settings
        </header>
    )
}
