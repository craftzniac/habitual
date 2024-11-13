import { TDay } from "@/app/types"
import getDatePartsFromIntlDate from "@/app/utils/getDatePartsFromIntlDate"
import { Dispatch, SetStateAction, useState } from "react"

type Props = { days: TDay[], selectedDay: TDay, setSelectedDay: Dispatch<SetStateAction<TDay>> }

export function JournalDays({ days, selectedDay, setSelectedDay }: Props) {
    return (
        <section className="flex w-full">
            <ul className="flex gap-4 w-full overflow-x-auto h-fit py-2">
                {
                    days.map((day) => (
                        <li key={day.id}>
                            <JournalDay day={day} isSelected={day.id === selectedDay.id} selectDay={() => setSelectedDay(day)} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

type JournalDayProps = {
    isSelected: boolean,
    day: TDay,
    selectDay: () => void
}


function JournalDay({ isSelected, day, selectDay }: JournalDayProps) {
    const { weekday, month, monthDay } = getDatePartsFromIntlDate(day.date)

    return (
        <button onClick={selectDay} type="button" className={`flex flex-col items-center p-4 rounded-2xl gap-1 ${isSelected ? "bg-primary-500" : ""}`}>
            <span className={`text-xs ${isSelected ? "text-primary-50" : ""}`}>{weekday}</span>
            <p className={`font-bold text-sm  ${isSelected ? "text-white" : "text-primary-500"}`}>{monthDay}</p>
            <span className={`capitalize text-[0.7rem] text-gray-75 ${isSelected ? " text-primary-100" : ""}`}>{month}</span>
        </button >
    )
}
