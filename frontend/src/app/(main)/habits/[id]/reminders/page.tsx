import { Plus_16_Purple } from "@/app/assets/icons";
import Button from "@/app/components/form/Button";
import Image from "next/image"
import ReminderItem from "./components/ReminderItem";
import { reminders } from "@/app/data";

export default function HabitReminders() {
    return (
        <section className="w-full h-full px-4 flex flex-col gap-6">
            <div className="flex items-center w-full justify-between">
                <h2 className="font-bold text-lg">Reminders</h2>
                <div className="w-fit">
                    <Button variant="text-btn" label="add reminder" labelClassName="capitalize text-primary-500">
                        <Image src={Plus_16_Purple} alt="" />
                    </Button>
                </div>
            </div>
            <ul className="flex flex-col gap-3">
                {reminders.map(reminder => (
                    <ReminderItem key={reminder.id} reminder={reminder} />
                ))}
            </ul>
        </section >
    )
}
