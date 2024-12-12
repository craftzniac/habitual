"use client";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/app/(pages)/(main)/components/presentation/BackButton";
import OverflowButton from "./OverflowButton";
import { usePathname } from "next/navigation";
import { Edit_Pencil_24, Trash_16 } from "@/app/assets/icons";

export default function Header({ habitId, habitName }: { habitId: string, habitName: string }) {
    const path = usePathname();
    function determineSelected(): "journal" | "habit-days" | "habit-info" {
        if (path.includes("journal")) {
            return "journal"
        }
        if (path.includes("habit-info")) {
            return "habit-info"
        }
        return "habit-days"
    }
    const selected = determineSelected();
    console.log("selected: ", selected);
    return (
        <div className="flex flex-col">
            <header className="flex items-center p-2 w-full gap-1">
                <BackButton />
                <h1 className="text-lg font-bold w-full line-clamp-1">{habitName}</h1>
                {selected === "habit-days" && <OverflowButton habitId={habitId} />}
            </header>

            <section className="hidden 2xl:flex items-center gap-2 px-4 pb-2">
                <div className="flex items-center gap-2 w-full">
                    <Link href={`/habits/${habitId}`} className={`rounded-2xl text-sm px-4 py-2 ${selected === "habit-days" ? "bg-primary-500/40" : "bg-primary-50"}`}>
                        Habit Days
                    </Link>
                    <Link href={`/habits/${habitId}/journal`} className={`rounded-2xl text-sm px-4 py-2 ${selected === "journal" ? "bg-primary-500/40" : "bg-primary-50"}`}>
                        Journal
                    </Link>
                </div>
                <div className="flex items-center text-sm font-bold">
                    <button type="button" className="px-6 py-3 flex items-center gap-1 hover:bg-primary-900/5 transition-colors duration-200 justify-center rounded-full">
                        <Image src={Edit_Pencil_24} alt="pencil" className="w-5 h-5" />
                        <span>Edit</span>
                    </button>
                    <button type="button" className="px-6 py-3 flex items-center gap-1 hover:bg-red/5 transition-colors duration-200 justify-center rounded-full">
                        <Image src={Trash_16} alt="pencil" className="w-5 h-5" />
                        <span className="text-red">Delete</span>
                    </button>
                </div>
            </section>
        </div>

    )
}