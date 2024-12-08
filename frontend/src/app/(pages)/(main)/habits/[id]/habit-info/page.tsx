import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import BackButton from "../../../components/presentation/BackButton";
import { getHabit } from "@/app/services/habitsService";
import { getHabitDays } from "@/app/services/habitDaysService";
import ErrorPage from "../../components/presentation/error-page";
import HabitDays from "../components/presentation/HabitDays";
import { TDayOfWeek } from "@/app/utils/types";
import CircularProgress from "../../../components/presentation/CircularProgress";

type Props = {
    params: {
        id: string
    }
}

export default async function HabitInfo({ params }: Props) {
    const id = params.id
    const accessToken = await getAccessToken();
    const [habitRes, habitDaysRes] = await Promise.all([getHabit({ accessToken, id }), getHabitDays({ accessToken, habitId: id })])
    // const res = await getHabit({ accessToken, id });
    if (habitRes.success === false) {
        return (
            <ErrorPage errorMsg={habitRes.message} />
        )
    } else if (habitDaysRes.success === false) {
        return (
            <ErrorPage errorMsg={habitDaysRes.message} />
        )
    }
    const habit = habitRes.data.habit;
    const habitDays = habitDaysRes.data.habitDays;
    console.log("habitdays:", habitDays);
    return (
        <section className="h-full w-full flex flex-col">
            <header className="flex items-center p-2 w-full gap-1">
                <BackButton />
                <h1 className="text-lg font-bold w-full line-clamp-1 pe-1">{habit.name}</h1>
            </header>

            <main className="w-full h-full flex flex-col px-4 overflow-y-auto gap-8 pb-2">
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
                    savedHabitDays={habitDays}
                    habitId={habit.id}
                    startDate={habit.startDate}
                    frequency={Array.from(habit.frequency as Set<TDayOfWeek>)}
                    durationInDays={habit.durationInDays}
                />
            </main>
        </section>

    )
}
