import { TDayOfWeek, TSavedHabitDay } from "@/app/utils/types"
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays"
import HabitDay from "./HabitDay"

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

    return (
        <div className="flex w-full h-fit justify-center">
            <ul className="grid grid-cols-4 max-w-[24rem] w-full gap-1 sm:grid-cols-4 sm:max-w-[30rem] md:grid-cols-5 md:max-w-[35rem] lg:grid-cols-7 lg:max-w-[45rem] xl:grid-cols-9 xl:max-w-[55rem] ">
                {
                    habitDays.map(date => {
                        const savedData = savedHabitDays.find(hd => hd.date === date);
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
