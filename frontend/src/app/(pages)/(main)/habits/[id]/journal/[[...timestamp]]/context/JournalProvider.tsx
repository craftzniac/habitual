"use client"
import { ReactNode, useState, createContext, useContext, Dispatch, SetStateAction } from "react";

type TJournal = {
    note: string,
    timestamp: number
}

const initialData: { journal: TJournal, habitDaysDates: string[] } = {
    journal: { note: "", timestamp: 0 },
    habitDaysDates: [],
}

const JournalContext = createContext<typeof initialData & { setJournal: Dispatch<SetStateAction<typeof initialData["journal"]>> }>({ ...initialData, setJournal: () => { } });

export function useJournalContext() {
    return useContext(JournalContext);
}

export default function JournalProvider({ children, journalData, habitDaysDates }: { children: ReactNode, journalData: TJournal, habitDaysDates: string[] }) {
    const [journal, setJournal] = useState<typeof initialData["journal"]>(journalData);
    return (
        <JournalContext.Provider value={{ journal, habitDaysDates, setJournal }}>{children}</JournalContext.Provider>
    )
}
