import { Day } from "@/app/types";
import getDatePartsFromIntlDate from "@/app/utils/getDatePartsFromIntlDate";

type Props = {
    isToday: boolean,
    day: Day
}

export default function HabitDay({ isToday, day }: Props) {
    const variant = day.status;
    const { month, monthDay } = getDatePartsFromIntlDate(day.date)

    function getWrapperDivStyleBasedOnVariant() {
        if (variant === "fulfilled") {
            return `bg-primary-500 text-white`
        }

        if (variant === "missed") {
            return `border-2 border-primary-500 text-primary-500`
        }

        return `border-2 border-primary-500/40 text-primary-500/40`
    }
    return (
        <div className={`w-full max-w-24 min-h-20 flex flex-col items-center justify-center rounded-2xl ${getWrapperDivStyleBasedOnVariant()
            } `}>
            <p className="text-lg font-bold">{monthDay}</p>
            <p className="text-sm capitalize">{month}</p>
        </div>
    )
}
