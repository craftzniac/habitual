import Image from "next/image";
import { THabitFilter } from "@/app/utils/types";
import ErrorPage from "../presentation/error-page";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import { getHabits } from "@/app/services/habitsService";
import HabitCard from "../../../components/presentation/HabitCard";
import { No_Habits } from "@/app/assets/illustrations"
import Button from "@/app/components/presentation/form/Button";
import { Plus_16_Purple } from "@/app/assets/icons";

export default async function Habits({ filter }: { filter: THabitFilter }) {
    const accessToken = await getAccessToken();
    const res = await getHabits({ accessToken, filter });
    if (!res.success) {
        return (
            <ErrorPage errorMsg={res.message} />
        )
    }
    const { habits } = res.data
    return (
        <section className="w-full h-full flex flex-col gap-4">
            {
                habits.length === 0 ? (
                    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
                        <Image src={No_Habits} alt="empty score board" />
                        <p className="text-gray-75">
                            No {filter && ((filter === "completed" || filter === "on-going") && filter)} habits yet!
                        </p>
                        <Button label="Create a Habit" variant="secondary">
                            <Image src={Plus_16_Purple} alt="plus icon" />
                        </Button>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 mds:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 w-full h-fit p-4">
                        {
                            habits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                />
                            ))
                        }
                    </ul>

                )
            }
        </section >
    )
}
