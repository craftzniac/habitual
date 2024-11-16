import { THabit } from "@/app/utils/types"

type HabitCardStatsProps = {
    stats: THabit["stats"],
    isHabitCompleted: boolean,
    variant?: "primary" | "secondary"
}

export default function HabitStats({
    variant = "primary",
    stats: {
        numberOfHabitDays,
        numberOfFulfilledHabitDays,
        numberOfMissedDays,
        numberOfRemainingDays
    },
    isHabitCompleted
}: HabitCardStatsProps) {
    if (variant === "primary") {

        return (
            <div className="flex flex-wrap w-full text-xs gap-x-4 gap-y-1">
                <p className="flex items-center gap-1">
                    <span className="text-gray-75">Duration: </span>
                    <span className="">{numberOfHabitDays} Days</span>
                </p>
                <p className="flex items-center gap-1">
                    <span className="text-gray-75">Fulfilled: </span>
                    <span className="text-primary-500">{numberOfFulfilledHabitDays} Days</span>
                </p>
                <p className="flex items-center gap-1">
                    <span className="text-gray-75">Missed: </span>
                    <span className="text-red">{numberOfMissedDays} Days</span>
                </p>
                {
                    isHabitCompleted === false && (
                        <p className="flex items-center gap-1 text-gray-75">
                            <span>Remaining: </span>
                            <span>{numberOfRemainingDays} Days</span>
                        </p>
                    )
                }
            </div>
        )
    } else {
        // secondary variant
        return (
            <div className="flex  w-full text-xs gap-3 justify-between">
                <span className="text-primary-900">Day {numberOfRemainingDays} of {numberOfHabitDays}</span>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-primary-500 min-w-3"></span>
                        <span className="text-primary-500">{numberOfFulfilledHabitDays}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded border-primary-500 bg-white border-[1px] min-w-3"></span>
                        <span className="text-primary-500">{numberOfMissedDays}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded border-primary-500/40 bg-white border-[1px] min-w-3"></span>
                        <span className="text-primary-500/40">{numberOfRemainingDays}</span>
                    </div>
                </div>

            </div>
        )
    }
}
