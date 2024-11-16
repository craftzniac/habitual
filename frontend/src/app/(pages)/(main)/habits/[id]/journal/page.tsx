"use client"
import { useState } from "react";
import { habitDays } from "@/app/utils/testData";
import { JournalDays } from "./components/presentation/JournalDays";
import { JournalNote } from "./components/presentation/JournalNote";
import { TDay } from "@/app/utils/types";

export default function HabitJournal() {
    const [selectedDay, setSelectedDay] = useState((habitDays as TDay[])[0])

    return (
        <section className="w-full h-full flex flex-col px-4">
            <JournalNote day={selectedDay} />
            <JournalDays days={habitDays as TDay[]} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </section>
    )
}

