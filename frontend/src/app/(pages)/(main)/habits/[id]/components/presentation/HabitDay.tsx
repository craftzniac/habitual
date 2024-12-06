"use client"
import { TSavedHabitDay } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import { getLocaleDateString } from "@/app/utils/helpers/tinyHelpers";
import { useState } from "react";

type Props = {
    date: string,
    savedData?: TSavedHabitDay
}

export default function HabitDay({ date, savedData }: Props) {
    const [isChecked, setIsChecked] = useState(savedData?.isCompleted || false);
    const { month, monthDay } = getDatePartsFromIntlDate(date)
    console.log("month:", month, "monthDay:", monthDay);
    // ${getWrapperDivStyleBasedOnVariant(variant)

    const localeTodayDate = getLocaleDateString(new Date());
    const localeDate = getLocaleDateString(new Date(date));

    const isToday = localeTodayDate === localeDate;
    return (
        <label className={`w-full max-w-24 min-h-20 flex flex-col items-center justify-center rounded-2xl ${styleIsChecked(isChecked)}`}>
            <input type="checkbox" className="hidden" checked={isChecked} onChange={(e) => {
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
    // return `${borderSize === "large" ? "border-2" : borderSize === "small" ? "border-[1px]" : ""} border-primary-500/40 text-primary-500/40`
}
