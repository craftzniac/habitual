"use client"
import { TSavedHabitDay } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import { useState } from "react";
import { getHabitDayDateStatus } from "@/app/utils/helpers/tinyHelpers";

type Props = {
    date: string,
    savedData?: TSavedHabitDay
}


export default function HabitDay({ date, savedData }: Props) {
    const [isChecked, setIsChecked] = useState(savedData?.isCompleted || false);
    const { month, monthDay } = getDatePartsFromIntlDate(date)

    const dateStatus = getHabitDayDateStatus(date);

    return (
        <label className={`cursor-pointer w-full max-w-24 min-h-20 flex flex-col items-center justify-center rounded-2xl border-primary-500 ${styleIsChecked(isChecked)} ${dateStatus === "today" ? "outline outline-4 outline-primary-500/50" : (
            dateStatus === "future" ? "opacity-50" : ""
        )}`}>
            <input disabled={dateStatus === "future"} type="checkbox" className="hidden" checked={isChecked} onChange={(e) => {
                console.log("clicked checkbox");
                const checked = e.target.checked;
                setIsChecked(checked);

                // use a server action

                // make api request to update this habitday's isCompleted
                // once request comes back, use that to set the state
            }} />
            <span className="text-lg font-bold">{monthDay}</span>
            <span className="text-sm capitalize">{month}</span>
        </label>
    )
}

function styleIsChecked(isChecked: boolean, borderSize: "large" | "small" = "large") {
    if (isChecked) {
        return `bg-primary-500 text-white`
    } else {
        return `${borderSize === "large" ? "border-2" : borderSize === "small" ? "border-[1px]" : ""} border-primary-500 text-primary-500`
    }
}
