import { Plus_16_Purple, Plus_16_White } from "@/app/assets/icons";
import Button from "@/app/components/form/Button";
import Image from "next/image"
import ReminderItem from "./components/ReminderItem";
import { reminders } from "@/app/data";
import { No_Reminders } from "@/app/assets/illustrations";

export default function HabitReminders() {
    if (reminders.length > 0) {
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
            <div className="w-full h-full flex flex-col p-8 gap-4 justify-center items-center">
                <Image src={No_Reminders} alt="no reminders illustration" />
                <p className="text-gray-75">No reminders yet</p>
                <Button label="Add New Reminder">
                    <Image src={Plus_16_White} alt="" />
                </Button>
            </div>
        </section >
    )
}
