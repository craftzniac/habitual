import Image from "next/image";
import Link from "next/link"
import { Check_16_Purple, X_16_Red } from "@/app/assets/icons";
import { THabit } from "@/app/utils/types"

type Prop = {
    habit: THabit,
}

export default function HabitCard({ habit }: Prop) {
    const status = "on-going";
    // let status: "completed" | "on-going" = "completed"
    return (
        <Link href={`/habits/${habit.id}`}
            className="rounded-lg bg-white border-2 border-primary-50 hover:bg-primary-50 hover:border-primary-100 transition-colors duration-200 p-3 flex flex-col gap-2 w-full"
        >
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-col gap-0.5 h-full">
                    <span className="flex justify-end text-sm w-full">
                        <span className="text-primary-900/50">status:</span>
                        <strong className={` ${status === "on-going" ? "text-primary-500" : "text-primary-900/50"}`}>{status}</strong>
                    </span>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-bold text-primary-700 line-clamp-1">{habit.name}</h2>
                        <p className="text-base leading-[150%] text-primary-900/60 line-clamp-2">{habit.description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {
                        status === "on-going" ? (
                            <span className="w-full text-start text-sm text-primary-900/60 font-bold">Day {10} of {habit.durationInDays}</span>
                        ) : (
                            <span className="flex items-center gap-2 text-xs">
                                <span className="flex items-center w-full text-start text-primary-900/60 font-bold">
                                    <Image src={Check_16_Purple} alt="x mark" className="w-4 h-4" />
                                    <span className="text-primary-500">{"5d"}</span>
                                </span>
                                <span className="flex items-center w-full text-start text-primary-900/60 font-bold">
                                    <Image src={X_16_Red} alt="x mark" className="w-4 h-4" />
                                    <span className="text-red">{"2d"}</span>
                                </span>
                            </span>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}



