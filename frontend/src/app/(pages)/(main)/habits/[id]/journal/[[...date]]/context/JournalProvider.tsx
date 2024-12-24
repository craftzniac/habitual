"use client"
import { ReactNode, useState, createContext, useContext } from "react";

type TJournal = {
    id?: string,
    note: string,
    date: string
}

const initialData: { journal: TJournal, habitDaysDates: string[] } = {
    journal: { id: "", note: "", date: "" },
    habitDaysDates: [],
}

const JournalContext = createContext<typeof initialData>(initialData);

export function useJournalContext() {
    return useContext(JournalContext);
}

export default function JournalProvider({ children, journalData, habitDaysDates }: { children: ReactNode, journalData: TJournal, habitDaysDates: string[] }) {
    const [journal, setJournal] = useState<typeof initialData["journal"]>(journalData);
    return (
        <JournalContext.Provider value={{ journal, habitDaysDates }}>{children}</JournalContext.Provider>
    )

}
