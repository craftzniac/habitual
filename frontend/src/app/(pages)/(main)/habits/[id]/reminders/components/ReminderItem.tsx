import { Reminder_Clock_24, Trash_16 } from "@/app/assets/icons"
import { THabitReminder } from "@/app/types"
import Image from "next/image"

type Props = { reminder: THabitReminder }

export default function ReminderItem({ reminder }: Props) {
    return (
        <div className="flex items-center justify-between pe-2 ps-1">
            <p className="w-full">{reminder.timestamp}</p>
            <div className="flex items-center gap-2">
                <button type="button" className="flex">
                    <Image src={Reminder_Clock_24} alt="" className="w-7 h-7" />
                </button>
                <button type="button" className="flex">
                    <Image src={Trash_16} alt="" className="w-7 h-7" />
                </button>
            </div>
        </div >
    )
}
