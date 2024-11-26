import Image from "next/image"
import Link from "next/link"
import HabitForm from "../components/logic/HabitForm"
import { Arrow_Left_16 } from "@/app/assets/icons"

export default function NewHabit() {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <header className="flex items-center px-2 py-2 w-full gap-0.5">
                <Link href="/habits" className="flex p-3 hover:bg-gray-5 rounded-full">
                    <Image src={Arrow_Left_16} className="w-4 h-4" alt="arrow left" />
                </Link>
                <h1 className="text-lg font-bold w-full">Add new Habit</h1>
            </header>
            <main className="flex h-full w-full overflow-y-auto px-4">
                <HabitForm />
            </main>
        </div>
    )
}
