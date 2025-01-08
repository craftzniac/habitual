"use client";
import { Check_16_Purple, X_16_Red } from "@/app/assets/icons";
import Image from "next/image";
import HabitConsistencyPercent from "../../habits/components/logic/HabitConsistencyPercent";
import { getMissedDaysCount } from "@/app/utils/helpers/tinyHelpers";
import { TSavedHabitDay } from "@/app/utils/types";


type Props = {
    habitConsistencyInPercent: number,
    pastDaysTimestamps: number[],
    durationInDays: number,
    savedHabitDays: TSavedHabitDay[]
};

export default function CompletedHabitCardStats({ durationInDays, habitConsistencyInPercent, pastDaysTimestamps, savedHabitDays }: Props) {
    // WARN: DO NOT USE THE habitDays from useGlobalContext() as savedHabitDays. That belongs to another habit
    const missedDaysCount = getMissedDaysCount({
        pastDaysTimestamps, savedHabitDays
    });
    const completedDaysCount = durationInDays - missedDaysCount;
    return (
        <span className="w-full flex items-center gap-2 justify-between">
            <span className="flex items-center gap-4 text-sm">
                <span className="flex items-center w-full text-start text-primary-900/60 font-bold gap-1">
                    <Image src={Check_16_Purple} alt="x mark" className="w-4 h-4" />
                    <span className="text-primary-500">{completedDaysCount}d</span>
                </span>
                <span className="flex items-center w-full text-start text-primary-900/60 font-bold gap-1">
                    <Image src={X_16_Red} alt="x mark" className="w-4 h-4" />
                    <span className="text-red">{missedDaysCount}d</span>
                </span>
            </span>
            <HabitConsistencyPercent percent={habitConsistencyInPercent} />
        </span>
    )
}
