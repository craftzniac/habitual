import { Day } from "@/app/types";
import getDatePartsFromIntlDate from "@/app/utils/getDatePartsFromIntlDate";
import getWrapperDivStyleBasedOnVariant from "@/app/utils/getWrapperDivStyleBasedOnHabitDayVariant";

type Props = {
    isToday: boolean,
    day: Day
}

export default function HabitDay({ isToday, day }: Props) {
    const variant = day.status;
    const { month, monthDay } = getDatePartsFromIntlDate(day.date)

    return (
        <div className={`w-full max-w-24 min-h-20 flex flex-col items-center justify-center rounded-2xl ${getWrapperDivStyleBasedOnVariant(variant)
            } `}>
            <p className="text-lg font-bold">{monthDay}</p>
            <p className="text-sm capitalize">{month}</p>
        </div>
    )
}
