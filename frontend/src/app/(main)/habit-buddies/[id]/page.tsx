import { redirect } from "next/navigation";

export default function HabitBuddyIndex({ params }: { params: { id: string } }) {
    return redirect(`/habit-buddies/${params.id}/chat`)
}

