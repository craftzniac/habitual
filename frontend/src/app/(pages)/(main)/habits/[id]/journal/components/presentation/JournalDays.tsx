"use client"
import Link from "next/link";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate"
import { useJournalContext } from "../../[[...timestamp]]/context/JournalProvider";
import { getDateOnlyTimestamp, getUTCDateString } from "@/app/utils/helpers/tinyHelpers";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";
import { LegacyRef, MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";

export function JournalDays() {
    const { journal, habitDaysDates: habitDaysTimestamps } = useJournalContext();
    const selectedDayDate = getUTCDateString(new Date(journal.timestamp));
    const ref = useRef<HTMLAnchorElement>();
    return (
        <section className="flex w-full overflow-x-scroll h-fit pb-4 pt-2">
            {/* NOTE: Not sure why max-w-0 fixes the overflow issue. But I guess it works so... :) */}
            <ul className="flex gap-2 w-fit max-w-0 min-w-0">
                {
                    habitDaysTimestamps.map((ts) => {
                        const date = getUTCDateString(new Date(ts));
                        return (
                            <li key={date}>
                                <JournalDay ref={date === selectedDayDate ? ref : undefined} timestamp={getDateOnlyTimestamp(new Date(date))} isSelected={date === selectedDayDate} />
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
    timestamp: number,
    ref: MutableRefObject<HTMLAnchorElement | undefined> | undefined
}


function JournalDay({ isSelected, timestamp, ref }: JournalDayProps) {
    const { weekday, month, monthDay } = getDatePartsFromIntlDate(timestamp)
    const { habit } = useGlobalContext();
    const habitId = habit.id;

    useLayoutEffect(() => {
        if (ref?.current) {
            ref.current.scrollIntoView({ inline: "center", behavior: "smooth" });
        }
    }, [ref])

    return (
        <Link ref={ref as LegacyRef<HTMLAnchorElement> | undefined} href={`/habits/${habitId}/journal/${timestamp}`} type="button" className={`flex flex-col items-center px-4 py-3 rounded-2xl gap-1 ${isSelected ? "bg-primary-500/40" : ""}`}>
            <span className={`text-xs`}>{weekday}</span>
            <p className={`font-bold text-sm`}>{monthDay}</p>
            <span className={`capitalize text-[0.7rem] text-gray-75 ${isSelected ? "text-primary-900" : ""}`}>{month}</span>
        </Link >
    )
}
