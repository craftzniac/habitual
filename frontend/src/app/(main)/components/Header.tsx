"use client"
import { navPaths } from "@/app/data"
import Image from "next/image"
import { usePathname, useParams } from "next/navigation"
import AddHabitBtn from "../habits/components/AddHabitBtn"
import BackButton from "./BackButton"
import OverflowButton from "../habits/[id]/components/OverflowButton"
import { habits } from "@/app/data"
import { Compass_24, Edit_Pencil_16, Edit_Pencil_24 } from "@/app/assets/icons"

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
                    {habits.length > 0 && <AddHabitBtn />}
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

    if (path.startsWith(navPaths.HABIT_BUDDIES.INDEX)) {
        // /habit-buddies/message-requests
        if (path.startsWith(navPaths.HABIT_BUDDIES.MESSAGE_REQUESTS)) {
            return (
                <header className="flex p-4 items-center justify-between gap-2">
                    <BackButton />
                    <h1 className="font-bold text-lg line-clamp-1 w-full">Message Requests</h1>
                </header>
            )
        }

        // /habit-buddies
        return (
            <header className="flex p-4 items-center justify-between">
                <h1 className="font-bold text-lg">Habits Buddies</h1 >
                <div className="flex items-center gap-4">
                    <button type="button">
                        <Image src={Compass_24} alt="" className="w-6 h-6" />
                    </button>
                    <button type="button">
                        <Image src={Edit_Pencil_24} alt="" className="w-6 h-6" />
                    </button>
                </div>
            </header>
        )
    }

    if (path.startsWith(navPaths.SETTINGS.INDEX)) {

        //    /settings/verify-email/email-code/new-email
        if (path.startsWith(navPaths.SETTINGS.VERIFY_EMAIL.EMAIL_CODE.NEW_EMAIL)) {
            return (
                <header className="flex p-4 gap-2 items-center">
                    <BackButton />
                    <h1 className="font-bold text-lg capitalize">Enter new Email</h1>
                </header>
            )
        }

        //    /settings/verify-email/email-code
        if (path.startsWith(navPaths.SETTINGS.VERIFY_EMAIL.EMAIL_CODE.INDEX)) {
            return (
                <header className="flex p-4 gap-2 items-center">
                    <BackButton />
                    <h1 className="font-bold text-lg capitalize">Enter Verification Code</h1>
                </header>
            )
        }

        //    /settings/verify-email
        if (path.startsWith(navPaths.SETTINGS.VERIFY_EMAIL.INDEX)) {
            return (
                <header className="flex p-4 gap-2 items-center">
                    <BackButton />
                    <h1 className="font-bold text-lg capitalize">Verify Email</h1 >
                </header>
            )
        }


        //    /settings
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
