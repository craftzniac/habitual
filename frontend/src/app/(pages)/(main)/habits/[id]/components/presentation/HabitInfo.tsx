"use client";
import CircularProgress from "@/app/(pages)/(main)/components/presentation/CircularProgress";
import HabitDays from "../logic/HabitDays";
import { TDayOfWeek } from "@/app/utils/types";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";

export default function HabitInfo({ extraClassName }: { extraClassName: string }) {
    const { habit } = useGlobalContext();
    return (
        <section className={`flex flex-col w-full gap-8 ${extraClassName}`}>
            <section className="flex  flex-col w-full gap-4">
                <div className="flex justify-between gap-2 items-center">
                    <span className="flex text-sm">
                        <span className="text-primary-900/50">status:</span>
                        <strong className={` ${habit.status === "on-going" ? "text-primary-500" : "text-primary-900/50"}`}>{habit.status}</strong>
                    </span>
                    <span className="flex gap-1 items-center text-sm">
                        <span className="text-primary-900/50">consistency</span>
                        <CircularProgress value={habit.consistencyInPercent} fontSize="0.8rem" strokeWidth={4} width={45} foregroundStroke="#923DE7" backgroundStroke="#F8E6F8" />
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{habit.name}</h2>
                    <p className="">{habit.description}</p>
                </div>
            </section>
            <HabitDays
                variant="small-uneditable"
                habitId={habit.id}
                startDate={habit.startDate}
                frequency={Array.from(habit.frequency as Set<TDayOfWeek>)}
                durationInDays={habit.durationInDays}
            />
        </section>

    )
}
