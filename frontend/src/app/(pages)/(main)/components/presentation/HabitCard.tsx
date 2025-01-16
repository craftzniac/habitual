import Link from "next/link"
import { THabit, THabitFilter, TSavedHabitDay } from "@/app/utils/types"
import HabitConsistencyPercent from "../../habits/components/logic/HabitConsistencyPercent";
import { getPastAndFutureDays } from "@/app/utils/helpers/tinyHelpers";
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays";
import CompletedHabitCardStats from "./CompletedHabitCardStats";

type Prop = {
    habit: THabit,
    savedHabitDays?: TSavedHabitDay[]
}

export default async function HabitCard({ habit, savedHabitDays }: Prop) {
    const status: THabitFilter = habit.status;
    const generatedHabitDaysTimestmap = generateHabitDays({
        durationInDays: habit.durationInDays,
        frequency: Array.from(habit.frequency || []),
        startDateString: habit.startDate
    });
    const { futureDaysTimestamps: remainingDaysTimestamp, pastDaysTimestamps } = getPastAndFutureDays(generatedHabitDaysTimestmap);
    const remainingDaysCount = remainingDaysTimestamp.length;

    return (
        <Link href={`/habits/${habit.id}`}
            className="rounded-lg bg-primary-50/50 border-2 border-primary-50 hover:bg-primary-50 hover:border-primary-100 transition-colors duration-200 p-3 flex flex-col gap-2 w-full h-[12rem]"
        >
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-col gap-0.5 h-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-bold text-primary-700 line-clamp-1">{habit.name}</h2>
                        {
                            habit.description ? (
                                <p className="text-base leading-[150%] text-primary-900/60 line-clamp-2">{habit.description}</p>
                            ) : (
                                <p className="text-base leading-[150%] text-primary-900/60 italic">&lt;No description&gt;</p>
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-2">
                    {
                        status === "on-going" ? (
                            <span className="w-full flex items-center text-start text-sm text-primary-900/60 font-bold gap-2">
                                <span className="w-full">
                                    {remainingDaysCount} days left
                                </span>
                                <HabitConsistencyPercent percent={habit.consistencyInPercent} />
                            </span>
                        ) : (
                            savedHabitDays && (
                                <CompletedHabitCardStats habitConsistencyInPercent={habit.consistencyInPercent} pastDaysTimestamps={pastDaysTimestamps} durationInDays={habit.durationInDays} savedHabitDays={savedHabitDays} />
                            )
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

