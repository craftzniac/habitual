import Image from "next/image";
import HabitForm from "./HabitForm";
import { X_16 } from "@/app/assets/icons";
import { useEffect, useRef } from "react";

export default function AddHabitForm({ close }: { close: () => void }) {
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
        <div className="hidden fixed inset-0 lg:flex bg-primary-900/20 w-full p-3 overflow-auto z-50 justify-center 3xl:items-center">
            <div ref={ref} className="w-full max-w-[31rem] bg-white shadow rounded-2xl p-8 flex flex-col gap-4 h-fit">
                <div className="flex items-center">
                    <h3 className="w-full text-center text-2xl font-bold">Add New Habit</h3>
                    <button type="button" onClick={close}>
                        <Image src={X_16} alt="x mark" className="w-6 h-6" />
                    </button>
                </div>
                <HabitForm mode="add" />
            </div>
        </div>
    )
}
