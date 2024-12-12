"use client"
import { TSavedHabitDay } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import { ChangeEvent, useEffect, useState } from "react";
import { getHabitDayDateStatus } from "@/app/utils/helpers/tinyHelpers";
import { upsertHabitDayStateAction } from "@/app/server-actions/habitDayActions";
import { useToast } from "@/app/components/logic/toast";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";

type HabitDayVariant = "large-editable" | "small-uneditable";

type Props = {
    date: string,
    savedData?: TSavedHabitDay,
    variant?: HabitDayVariant,
    habitId: string
}


export default function HabitDay({ variant = "large-editable", date, savedData, habitId }: Props) {
    const { refreshHabitDays } = useGlobalContext();
    const [isChecked, setIsChecked] = useState(savedData?.isCompleted || false);
    const { month, monthDay } = getDatePartsFromIntlDate(date)
    const { toast } = useToast();

    const dateStatus = getHabitDayDateStatus(date);

    useEffect(() => {
        setIsChecked(savedData?.isCompleted || false);
    }, [savedData?.isCompleted])

    const onHabitDayUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const prevValue = isChecked;

        //optimistic update
        setIsChecked(checked);
        const data = { date, habitId, isCompleted: checked, id: savedData?.id }
        const errorRes = await upsertHabitDayStateAction(data);
        if (errorRes) {
            // reset the isChecked to it's former value before the most recent call to setIsChecked;
            setIsChecked(prevValue);
            toast(errorRes.message, { type: "error" });
            return;
        }

        await refreshHabitDays();
    }

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
            <input disabled={dateStatus === "future"} type="checkbox" className="hidden" checked={isChecked} onChange={onHabitDayUpdate} />
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
