import Image from "next/image";
import HabitForm from "./HabitForm";
import { X_16 } from "@/app/assets/icons";
import { useEffect, useRef } from "react";

export default function EditHabitForm({ close }: { close: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onClickOutside(this: Document, event: MouseEvent): void {
            if (ref.current && ref.current.contains(event.target as Node) === false) {
                // user clicked outside the form. close it
                close();
            }
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    }, [close])

    return (
        <div className="hidden fixed inset-0 lg:flex bg-primary-900/20 justify-center items-center  w-full p-3 z-20">
            <div ref={ref} className="w-full font-normal max-w-[31rem] bg-white shadow rounded-2xl p-8 flex flex-col gap-4">
                <div className="flex items-center">
                    <h3 className="w-full text-center text-2xl font-bold">Edit Habit</h3>
                    <button type="button" onClick={close}>
                        <Image src={X_16} alt="x mark" className="w-6 h-6" />
                    </button>
                </div>
                <HabitForm mode="edit" />
            </div>
        </div>
    )
}