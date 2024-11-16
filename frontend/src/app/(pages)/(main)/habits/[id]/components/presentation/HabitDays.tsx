import { habitDays } from "@/app/utils/testData"
import HabitDay from "./HabitDay"
import { TDay } from "@/app/utils/types"

export default function HabitDays() {
    const currentDay = new Date().toISOString()
    return (
        <div className="flex w-full justify-center">
            <ul className="grid grid-cols-4 max-w-[24rem] w-full gap-1 sm:grid-cols-4 sm:max-w-[30rem] md:grid-cols-5 md:max-w-[35rem] lg:grid-cols-7 lg:max-w-[45rem] xl:grid-cols-9 xl:max-w-[55rem] ">
                {
                    (habitDays as TDay[]).map(day => (
                        <li key={day.id} className="w-full flex justify-center items-center">
                            <HabitDay isToday={false} day={day} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
