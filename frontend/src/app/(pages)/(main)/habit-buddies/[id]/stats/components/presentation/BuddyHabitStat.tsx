import CircularProgressBar from "@/app/(pages)/(main)/components/presentation/CircularProgressBar";
import HabitStats from "@/app/(pages)/(main)/components/presentation/HabitStats";
import { habitDays, habits } from "@/app/utils/testData";
import { TDay, THabit } from "@/app/utils/types";
import getDatePartsFromIntlDate from "@/app/utils/helpers/getDatePartsFromIntlDate";
import getWrapperDivStyleBasedOnVariant from "@/app/utils/helpers/getWrapperDivStyleBasedOnHabitDayVariant";

export default function BuddyHabitStat() {
    const habit = (habits as THabit[])[1];
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex w-full items-start gap-2">
                <div className="flex flex-col gap-2 w-full">
                    <p>{habit.title}</p>
                    <p className="text-gray-75 text-xs">{habit.description}</p>
                </div>
                <CircularProgressBar value={23} />
            </div>
            <HabitStats variant="secondary" stats={habit.stats} isHabitCompleted={habit.isCompleted} />
            <ul className="flex flex-wrap gap-1">
                {(habitDays as TDay[]).map(day => {
                    return (
                        <li key={day.id}>
                            <BuddyHabitDay day={day} />
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

type BuddyHabitDayProps = {
    day: TDay
}

function BuddyHabitDay({ day }: BuddyHabitDayProps) {
    const variant = day.status;
    const { month, monthDay } = getDatePartsFromIntlDate(day.date)

    return (
        <div className={`w-8 h-8 flex flex-col items-center justify-center rounded-lg ${getWrapperDivStyleBasedOnVariant(variant, "small")
            } `}>
            <p className="text-sm">{monthDay}</p>
            <p className="text-[0.5rem] capitalize">{month}</p>
        </div>
    )
}
