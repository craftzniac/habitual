import HabitForm from "../../components/logic/HabitForm";

export default function EditHabitPage() {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <main className="flex h-full w-full overflow-y-auto px-4">
                <HabitForm mode="edit" />
            </main>
        </div>
    )
}
