"use client"
import Link from "next/link";
import { TSavedHabitDay } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import { ChangeEvent, useEffect, useState } from "react";
import { getHabitDayTimestampStatus } from "@/app/utils/helpers/tinyHelpers";
import { upsertHabitDayStateAction } from "@/app/server-actions/habitDayActions";
import { useToast } from "@/app/components/logic/toast";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";

type HabitDayVariant = "large-editable" | "small-uneditable";

type Props = {
    timestamp: number,
    savedData?: TSavedHabitDay,
    variant?: HabitDayVariant,
    habitId: string
}


export default function HabitDay({ variant = "large-editable", timestamp, savedData, habitId }: Props) {
    const { refreshHabitDays } = useGlobalContext();
    const [isChecked, setIsChecked] = useState(savedData?.isCompleted || false);
    const { month, monthDay } = getDatePartsFromIntlDate(timestamp);
    const { toast } = useToast();

    const dateStatus = getHabitDayTimestampStatus(timestamp);

    useEffect(() => {
        setIsChecked(savedData?.isCompleted || false);
    }, [savedData?.isCompleted])

    const onHabitDayUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const prevValue = isChecked;

        //optimistic update
        setIsChecked(checked);
        const data = { timestamp, habitId, isCompleted: checked }
        const errorRes = await upsertHabitDayStateAction(data);
        if (errorRes) {
            // reset the isChecked to it's former value before the most recent call to setIsChecked;
            setIsChecked(prevValue);
            toast(errorRes.message, { type: "error" });
            return;
        }

        await refreshHabitDays();
    }

    return variant === "large-editable" ? (
        <label className={`cursor-pointer 
            w-full max-w-24 min-h-20 rounded-2xl
          flex flex-col items-center justify-center 
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
        `}
        >
            <input disabled={dateStatus === "future"} type="checkbox" className="hidden" checked={isChecked} onChange={onHabitDayUpdate} />
            <span className={`font-bold text-lg`}>{monthDay}</span>
            <span className={`capitalize text-sm`}>{month}</span>
        </label>
    ) : (
        <Link href={`/habits/${habitId}/journal/${timestamp}`} className={`cursor-pointer 
            rounded-lg w-full max-w-12 p-0.5 flex flex-col items-center justify-center 
            ${styleIsChecked(variant, isChecked)} 
           ${dateStatus === "future" ? "opacity-40" : ""} 
        `}
        >
            <span className={`font-bold ${variant === "small-uneditable" ? "text-base" : "text-lg"}`}>{monthDay}</span>
            <span className={`capitalize ${variant === "small-uneditable" ? (`
                text-xs ${isChecked ? "text-white" : "text-gray-75"}
            `) : "text-sm"}`}>{month}</span>
        </Link>

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
