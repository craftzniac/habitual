import HabitForm from "../components/logic/HabitForm"
import { navPaths } from "@/app/utils/constants"
import BackButton from "../../components/presentation/BackButton"

export default function NewHabit() {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <header className="flex items-center px-2 py-2 w-full gap-1">
                <BackButton href={navPaths.HABITS.INDEX} />
                <h1 className="text-lg font-bold w-full">Add new Habit</h1>
            </header>
            <main className="flex h-full w-full overflow-y-auto px-4">
                <HabitForm mode="add" />
            </main>
        </div>
    )
}
