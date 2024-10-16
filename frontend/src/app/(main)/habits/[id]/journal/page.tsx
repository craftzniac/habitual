"use client"
import { habitDays } from "@/app/data";
import { JournalDays } from "./components/JournalDays";
import { JournalNote } from "./components/JournalNote";
import { useState } from "react";
import { Day } from "@/app/types";

export default function HabitJournal() {
    const [selectedDay, setSelectedDay] = useState((habitDays as Day[])[0])

    return (
        <section className="w-full h-full flex flex-col px-4">
            <JournalNote day={selectedDay} />
            <JournalDays days={habitDays as Day[]} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </section>
    )
}

