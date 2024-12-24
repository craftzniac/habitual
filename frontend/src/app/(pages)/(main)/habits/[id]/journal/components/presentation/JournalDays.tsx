"use client"
import Link from "next/link";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate"
import { useJournalContext } from "../../[[...date]]/context/JournalProvider";
import { getUTCDateString } from "@/app/utils/helpers/tinyHelpers";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";

export function JournalDays() {
    const { journal, habitDaysDates: days } = useJournalContext();
    const selectedDayDate = getUTCDateString(new Date(journal.date));
    return (
        <section className="flex w-full overflow-x-scroll h-fit pb-4 pt-2">
            {/* NOTE: Not sure why max-w-0 fixes the overflow issue. But I guess it works so... :) */}
            <ul className="flex gap-2 w-fit max-w-0 min-w-0">
                {
                    days.map((_date) => {
                        const date = getUTCDateString(new Date(_date));
                        console.log("date === selectedDay: ", date, selectedDayDate, date === selectedDayDate ? "true" : undefined);
                        return (
                            <li key={date}>
                                <JournalDay date={date} isSelected={date === selectedDayDate} />
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

type JournalDayProps = {
    isSelected: boolean,
    date: string,
}


function JournalDay({ isSelected, date }: JournalDayProps) {
    const { weekday, month, monthDay } = getDatePartsFromIntlDate(date)
    const { habit } = useGlobalContext();
    const habitId = habit.id;
    return (
        <Link href={`/habits/${habitId}/journal/${date}`} type="button" className={`flex flex-col items-center px-4 py-3 rounded-2xl gap-1 ${isSelected ? "bg-primary-500/40" : ""}`}>
            <span className={`text-xs`}>{weekday}</span>
            <p className={`font-bold text-sm`}>{monthDay}</p>
            <span className={`capitalize text-[0.7rem] text-gray-75 ${isSelected ? "text-primary-900" : ""}`}>{month}</span>
        </Link >
    )
}
