"use client"
import { habitDays } from "@/app/data";
import { JournalDays } from "./components/JournalDays";
import { JournalNote } from "./components/JournalNote";
import { useState } from "react";

export default function HabitJournal() {
    const [selectedDay, setSelectedDay] = useState(habitDays[0])

    return (
        <section className="w-full h-full flex flex-col px-4">
            <JournalNote day={selectedDay} />
            <JournalDays days={habitDays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </section>
    )
}

