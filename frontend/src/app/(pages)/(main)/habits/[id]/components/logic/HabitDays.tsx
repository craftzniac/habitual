import { TDayOfWeek, TSavedHabitDay } from "@/app/utils/types"
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays"
import HabitDay from "./HabitDay"
import { getHabitDayDateStatus, getHabitDaySavedDate } from "@/app/utils/helpers/tinyHelpers"

type Props = {
    habitId: string,
    startDate: string,
    frequency: TDayOfWeek[],
    durationInDays: number,
    savedHabitDays: TSavedHabitDay[],
    variant?: "large-editable" | "small-uneditable"
}

export default async function HabitDays({ variant = "large-editable", savedHabitDays, habitId, startDate, frequency, durationInDays }: Props) {
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

    // (
    //     "grid grid-cols-6 sm:grid-cols-10 md:grid-cols-[repeat(13,minmax(0,1fr))] w-full justify-center gap-2 "
    // )
    // : (
    //     `grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-11  xl:gap-4 2xl:grid-cols-[repeat(13,minmax(0,1fr))]  3xl:grid-cols-[repeat(15,minmax(0,1fr))]  4xl:grid-cols-[repeat(20,minmax(0,1fr))] w-full justify-center gap-2 `
    // )

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
                            <span className="font-bold text-primary-500">{getFulfilledDaysCount(savedHabitDays)}d</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                            <span className="opacity-50">missed:</span>
                            <span className="font-bold text-red">{getMissedDaysCount(pastDays)}d</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                            <span className="opacity-50">remaining:</span>
                            <span className="font-bold text-gray-75">{futureDays.length}d</span>
                        </span>
                    </>
                ) : (
                    <>
                        <Box variant="fulfilled" count={getFulfilledDaysCount(savedHabitDays)} />
                        <Box variant="missed" count={getMissedDaysCount(pastDays)} />
                        <Box variant="in-future" count={futureDays.length} />
                    </>
                )}
            </div>
            <ul>
                {
                    habitDays.map(date => {
                        const savedData = getHabitDaySavedDate(savedHabitDays, date);
                        return (
                            <li key={date} className="w-full flex justify-center items-center">
                                <HabitDay variant={variant} date={date} savedData={savedData} />
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
        <div className="flex items-center gap-1">
            {/*The box*/}
            <span className={`w-4 h-4 rounded border-[1px] border-primary-500 ${variant === "fulfilled" ? "bg-primary-500" : (
                variant === "missed" ? "" : (
                    variant === "in-future" ? "opacity-50" : ""
                )
            )}`}></span>
            <span className="text-sm">{count}</span>
        </div>
    )
}
