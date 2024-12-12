"use client"
import { TDayOfWeek, TSavedHabitDay } from "@/app/utils/types"
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays"
import HabitDay from "./HabitDay"
import { getHabitDayDateStatus, getHabitDaySavedDate } from "@/app/utils/helpers/tinyHelpers"
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider"

type Props = {
    habitId: string,
    startDate: string,
    frequency: TDayOfWeek[],
    durationInDays: number,
    variant?: "large-editable" | "small-uneditable"
}

export default function HabitDays({ variant = "large-editable", habitId, startDate, frequency, durationInDays }: Props) {
    const { habitDays: savedHabitDays } = useGlobalContext();
    const habitDays = generateHabitDays({
        durationInDays, frequency, startDateString: startDate
    });

    function getFulfilledDaysCount(habits: TSavedHabitDay[]) {
        return habits.filter(habit => habit.isCompleted).length
    }

    // using the generatedHabitDays, find those habit days that match today or past. Exclude those that have isCompleted set to true. Count the rest
    function getPastAndFutureDays(generatedHabitDays: string[]): { pastDays: string[], futureDays: string[] } {
        let today;
        const pastDays: string[] = []
        const futureDays: string[] = []
        generatedHabitDays.forEach(date => {
            const dateStatus = getHabitDayDateStatus(date);
            switch (dateStatus) {
                case "future":
                    futureDays.push(date); break;
                case "past":
                    pastDays.push(date); break;
                default:
                    // has to be today
                    today = date
            }
        })
        return { pastDays, futureDays };
    }

    function getMissedDaysCount(pastDays: string[]): number {
        // remove all the habit days that have isCompleted set to true and count the rest.
        const missedPastDays = pastDays.filter(date => {
            const savedData = getHabitDaySavedDate(savedHabitDays, date);
            if (savedData && savedData.isCompleted) {
                return false;
            }
            return true;
        })


        return [...missedPastDays].length;
    }

    const { pastDays, futureDays } = getPastAndFutureDays(habitDays);

    const fulfilledDaysCount = getFulfilledDaysCount(savedHabitDays);
    const missedDaysCount = getMissedDaysCount(pastDays);
    const futureDaysCount = futureDays.length;

    return (
        <section className={`habit-days ${variant === "small-uneditable" ? "habit-days--small" : "habit-days--large"}`}>
            <div className={`w-full 
                ${variant === "small-uneditable"
                    ? "flex gap-2 justify-between mds:justify-start mds:gap-4"
                    : "flex justify-end items-center gap-2"
                }`
            }>
                {variant === "small-uneditable" ? (
                    <>
                        <span className="flex items-center gap-1 text-xs">
                            <span className="opacity-50">completed:</span>
                            <span className="font-bold text-primary-500">{fulfilledDaysCount}d</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                            <span className="opacity-50">missed:</span>
                            <span className="font-bold text-red">{missedDaysCount}d</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                            <span className="opacity-50">remaining:</span>
                            <span className="font-bold text-gray-75">{futureDaysCount}d</span>
                        </span>
                    </>
                ) : (
                    <>
                        <Box variant="fulfilled" count={fulfilledDaysCount} />
                        <Box variant="missed" count={missedDaysCount} />
                        <Box variant="in-future" count={futureDaysCount} />
                    </>
                )}
            </div>
            <ul>
                {
                    habitDays.map(date => {
                        const savedData = getHabitDaySavedDate(savedHabitDays, date);
                        return (
                            <li key={date} className="w-full flex justify-center items-center">
                                <HabitDay variant={variant} date={date} savedData={savedData} habitId={habitId} />
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

function Box({ variant, count }: {
    variant: "fulfilled" | "missed" | "in-future",
    count: number
}) {
    return (
        <div className="flex items-center gap-1"> {/*The box*/}
            <span className={`w-4 h-4 rounded border-[1px] border-primary-500 ${variant === "fulfilled" ? "bg-primary-500" : (
                variant === "missed" ? "" : (
                    variant === "in-future" ? "opacity-50" : ""
                )
            )}`}></span>
            <span className="text-sm">{count}</span>
        </div>
    )
}
