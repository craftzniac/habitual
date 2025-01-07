import Image from "next/image";
import { No_Habits } from "@/app/assets/illustrations";
import type { THabitFilter } from "@/app/utils/types";

export function NoHabits({ filter }: {
    filter?: THabitFilter
}) {
    let message = "";
    switch (filter) {
        case "today":
            message = "No habits scheduled for today"
            break;
        case "on-going":
            message = "No on-going habits"
            break;
        case "completed":
            message = "You have not completed any habits yet"
            break;
        default:
            message = "No habits created yet"
    }

    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-4">
            <Image src={No_Habits} alt="empty score board" />
            <p className="text-gray-75">
                {message}
            </p>
        </div>
    )
}
