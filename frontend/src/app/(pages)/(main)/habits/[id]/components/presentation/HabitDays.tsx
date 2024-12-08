import { TDayOfWeek, TSavedHabitDay } from "@/app/utils/types"
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays"
import HabitDay from "./HabitDay"
import { getHabitDayDateStatus, getHabitDaySavedDate } from "@/app/utils/helpers/tinyHelpers"

type Props = {
    habitId: string,
    startDate: string,
    frequency: TDayOfWeek[],
    durationInDays: number,
    savedHabitDays: TSavedHabitDay[]
}

export default async function HabitDays({ savedHabitDays, habitId, startDate, frequency, durationInDays }: Props) {
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

    return (
        <div className="flex flex-col w-full h-fit items-center gap-2">
            <div className="w-full justify-end flex items-center gap-2">
                <Box variant="fulfilled" count={getFulfilledDaysCount(savedHabitDays)} />
                <Box variant="missed" count={getMissedDaysCount(pastDays)} />
                <Box variant="in-future" count={futureDays.length} />
            </div>
            <ul className="grid grid-cols-4 w-full justify-center gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-11 
                xl:gap-4 2xl:grid-cols-[repeat(13,minmax(0,1fr))] 
                3xl:grid-cols-[repeat(15,minmax(0,1fr))]  4xl:grid-cols-[repeat(20,minmax(0,1fr))]
                ">
                {
                    habitDays.map(date => {
                        const savedData = getHabitDaySavedDate(savedHabitDays, date);
                        return (
                            <li key={date} className="w-full flex justify-center items-center">
                                <HabitDay date={date} savedData={savedData} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

function Box({ variant, count }: {
    variant: "fulfilled" | "missed" | "in-future",
    count: number
}) {
    return (
        <div className="flex items-center gap-1">
            <span className={`w-4 h-4 rounded border-[1px] border-primary-500 ${variant === "fulfilled" ? "bg-primary-500" : (
                variant === "missed" ? "" : (
                    variant === "in-future" ? "opacity-50" : ""
                )
            )}`}></span>
            <span className="text-sm">{count}</span>
        </div>
    )
}
