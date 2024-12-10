"use client"
import { TSavedHabitDay } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import { useState } from "react";
import { getHabitDayDateStatus } from "@/app/utils/helpers/tinyHelpers";

type HabitDayVariant = "large-editable" | "small-uneditable";

type Props = {
    date: string,
    savedData?: TSavedHabitDay,
    variant?: HabitDayVariant
}


export default function HabitDay({ variant = "large-editable", date, savedData }: Props) {
    const [isChecked, setIsChecked] = useState(savedData?.isCompleted || false);
    const { month, monthDay } = getDatePartsFromIntlDate(date)

    const dateStatus = getHabitDayDateStatus(date);

    return (
        <label className={`cursor-pointer 
            ${variant === "small-uneditable"
                ? "pointer-events-none rounded-lg w-full max-w-12 p-0.5"
                : "w-full max-w-24 min-h-20 rounded-2xl"
            }  flex flex-col items-center justify-center 
            ${styleIsChecked(variant, isChecked)} 
            ${variant === "large-editable"
                ? (
                    dateStatus === "today" ?
                        "outline outline-4 outline-primary-500/50"
                        : (
                            dateStatus === "future" ? "opacity-50" : ""
                        )
                )
                : ("")
            }
           ${variant === "small-uneditable" ? (dateStatus === "future" ? "opacity-40" : "") : ""} 
        `}
        >
            <input disabled={dateStatus === "future"} type="checkbox" className="hidden" checked={isChecked} onChange={(e) => {
                const checked = e.target.checked;
                setIsChecked(checked);

                // use a server action

                // make api request to update this habitday's isCompleted
                // once request comes back, use that to set the state
            }} />
            <span className={`font-bold ${variant === "small-uneditable" ? "text-base" : "text-lg"}`}>{monthDay}</span>
            <span className={`capitalize ${variant === "small-uneditable" ? (`
                text-xs ${isChecked ? "text-white" : "text-gray-75"}
            `) : "text-sm"}`}>{month}</span>
        </label>
    )
}

function styleIsChecked(variant: HabitDayVariant, isChecked: boolean) {
    if (isChecked) {
        return `bg-primary-500 text-white`
    } else {
        if (variant === "small-uneditable") {
            return `border-[1px] border-primary-100`

        }
        return ` border-2  border-primary-500 text-primary-500`
    }
}
