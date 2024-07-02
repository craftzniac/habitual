import { HabitStats } from "@/app/types"

type Props = {
    variant?: 1 | 2 | 3,
    stats: HabitStats
}

export default function HabitDaysStats({ variant = 1, stats }: Props) {
    return (
        <div className="flex w-full gap-4">
            <span className="text-xs">Day x of {stats.numberOfHabitDays} </span>
            <div className="flex items-center gap-2">
                <BubbleStat variant="fulfilled" statValue={stats.numberOfFulfilledHabitDays} />
                <BubbleStat variant="missed" statValue={stats.numberOfMissedDays} />
                <BubbleStat variant="remaining" statValue={stats.numberOfRemainingDays} />
            </div>
        </div>
    )
}


type BubbleStatProps = {
    variant: "fulfilled" | "missed" | "remaining",
    statValue: number
}

function BubbleStat({ variant = "fulfilled", statValue }: BubbleStatProps) {

    function getStylesBasedOnVariant(part: "bubble" | "value") {
        if (part === "bubble") {
            return variant === "fulfilled" ? "bg-primary-500" : (
                variant === "missed" ? "border-[1px] border-primary-500" : (
                    variant === "remaining" ? "border-[1px] border-primary-500/40" : ""
                )
            )
        }
        else {
            return variant === "fulfilled" ? "text-primary-500" : (
                variant === "missed" ? "text-primary-500" : (
                    variant === "remaining" ? "text-primary-900/40" : ""
                )
            )
        }

    }

    return (
        <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${getStylesBasedOnVariant("bubble")} `}></div>
            <span className={`text-xs ${getStylesBasedOnVariant("value")}`}>{statValue}</span>
        </div>

    )
}
