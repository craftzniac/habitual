"use client"
import { navPaths } from "@/app/data"
import { usePathname } from "next/navigation"
import AddHabitBtn from "../habits/components/AddHabitBtn"

export default function Header() {
    const path = usePathname()

    const pageSpecificOptions = getPageSpecificOptions(path)

    return (
        <header className="flex p-4 items-center justify-between">
            <Title path={path} />
            {
                pageSpecificOptions
            }
        </header>
    )
}

function getPageSpecificOptions(path: string) {
    if (path.startsWith(navPaths.HABITS)) {
        // possibly other stuff too like url params
        return <>
            <AddHabitBtn />
        </>
    }
    return <></>
}


function Title({ path }: { path: string }) {
    let title = ""
    if (path.startsWith(navPaths.OVERVIEW)) {
        title = "Overview"
    }
    if (path.startsWith(navPaths.HABITS)) {
        title = "Habits"
    }
    if (path.startsWith(navPaths.HABIT_BUDDIES)) {
        title = "Habit Buddies"
    }
    if (path.startsWith(navPaths.SETTINGS)) {
        title = "Settings"
    }

    return (
        title ? (
            <h1 className="font-bold text-lg" > {title}</h1 >
        ) : <></>
    )
}
