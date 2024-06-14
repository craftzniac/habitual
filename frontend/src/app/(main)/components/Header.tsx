"use client"
import { navPaths } from "@/app/data"
import { usePathname } from "next/navigation"

export default function Header() {
    let title = <></>
    const path = usePathname()

    return (
        <header className="flex flex-col p-4">
            <Title path={path} />
        </header>
    )
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
