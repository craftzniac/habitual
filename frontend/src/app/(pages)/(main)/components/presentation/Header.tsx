"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import AddHabitBtn from "../../habits/components/presentation/AddHabitBtn"
import BackButton from "./BackButton"
import OverflowButton from "@/app/(pages)/(main)/habits/[id]/components/presentation/OverflowButton"
import { habits as habitsDummyData, habitBuddies } from "@/app/utils/testData"
import { navPaths } from "@/app/utils/constants"
import { Compass_24, Edit_Pencil_24, Settings_24_Black, Stats_24 } from "@/app/assets/icons"
import { THabit } from "@/app/utils/types"

type Params = {
    id: string
}

export default function Header() {
    const habits = habitsDummyData as THabit[];
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
        // /habits
        if (path === navPaths.HABITS.INDEX) {
            return (
                <header className="flex p-4 items-center justify-between gap-2">
                    <h1 className="font-bold text-lg">Habits</h1 >
                    {habits.length > 0 && <AddHabitBtn />}
                </header>
            )
        }

        // /habits/new
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

        // /habit-buddies
        if (path === navPaths.HABIT_BUDDIES.INDEX) {
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

        // /habit-buddies/message-requests
        if (path.startsWith(navPaths.HABIT_BUDDIES.MESSAGE_REQUESTS)) {
            return (
                <header className="flex p-4 items-center justify-between gap-2">
                    <BackButton />
                    <h1 className="font-bold text-lg line-clamp-1 w-full">Message Requests</h1>
                </header>
            )
        }

        // /habit-buddies/:id
        const habitBuddy = habitBuddies[0];

        return (
            <header className="flex p-4 items-center justify-between gap-2">
                <BackButton />
                <div className="flex items-center w-full gap-2">
                    <div className={`rounded-full`}>
                        <Image src={habitBuddy.profileImage} alt={`habit buddy's profile picture`} className="rounded-full w-8 h-8 min-w-8" />
                    </div>

                    <h1 className="font-bold text-base line-clamp-1 w-full">{habitBuddy.username}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={`/habit-buddies/${habitBuddy.id}/stats`} type="button">
                        <Image src={Stats_24} alt="" className="w-6 h-6 min-w-6" />
                    </Link>
                    <Link href={`/habit-buddies/${habitBuddy.id}/settings`}>
                        <Image src={Settings_24_Black} alt="" className="w-6 h-6 min-w-6" />
                    </Link>
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
