import { Plus_16_Gray, X_16 } from "@/app/assets/icons";
import { reminderTimeOptions } from "@/app/utils/constants";
import { TReminderTime } from "@/app/utils/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
    label: string,
    name: string,
    errMsg?: string,
    onChange: (...event: any[]) => void,
    onBlur: () => void,
    value: Set<TReminderTime>
}

export default function RemindersInput({ label, name, errMsg, onChange, value, onBlur }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    function addReminder(reminderTime: TReminderTime) {
        const newVal = new Set(value);
        newVal.add(reminderTime);
        onChange(newVal);
    }

    function removeReminder(reminderTime: TReminderTime) {
        const newVal = new Set(value);
        newVal.delete(reminderTime);
        onChange(newVal);
    }

    return (
        <div className="flex flex-col w-full gap-1 z-0" ref={ref}>
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <ul className="flex flex-wrap gap-2">
                {
                    Array.from(value).map(val => (
                        <li key={val}>
                            <Reminder value={val} removeSelf={() => removeReminder(val)} />
                        </li>
                    ))
                }
                <li>
                    <ReminderTimeInput addReminder={addReminder} onBlur={onBlur} />
                </li>
            </ul>
        </div>
    )
}


function Reminder({ value, removeSelf }: { value: TReminderTime, removeSelf: () => void }) {
    return (
        <div className="relative w-fit group">
            <div className="relative rounded-lg border-[1px] border-gray-25 text-sm w-20 h-10 flex justify-center items-center cursor-pointer">
                <p>{value}</p>
            </div>
            <button onClick={removeSelf} className="absolute -right-2 -top-2 rounded-full bg-gray-75 hidden group-hover:block">
                <Image src={X_16} alt="x mark" className="w-4 h-4" />
            </button>
        </div>
    )
}

// The plus button used to add reminders
export function ReminderTimeInput({ addReminder, onBlur }: {
    addReminder: (reminderTime: TReminderTime) => void,
    onBlur: () => void
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isShowOptions, setIsShowOptions] = useState(false);

    // event listener to close dropdown when user clicks outside the component.
    useEffect(() => {
        function onClickOutside(this: Document, event: MouseEvent): void {
            if (ref.current && ref.current.contains(event.target as Node) === false) {
                // user clicked outside the dropdown. close it
                hideOptions();
                onBlur();
            }
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    }, [onBlur])

    function toggleIsShowOptions() {
        setIsShowOptions(prev => !prev);
    }

    function hideOptions() {
        setIsShowOptions(false);
    }

    return (
        <div className="w-fit flex flex-col gap-1" ref={ref}>
            <button type="button" className="flex justify-center items-center w-20 h-10 border-[1px] border-gray-25 rounded-lg" onClick={toggleIsShowOptions}>
                <Image src={Plus_16_Gray} alt="plus icon" className="w-4 h-4" />
            </button>
            <div className="relative w-full">
                {
                    isShowOptions && (
                        <ul className="absolute top-0 right-0 left-0 max-h-[12rem] border-[1px] border-primary-50 bg-gray-2 rounded-lg p-2 gap-1 overflow-y-auto flex flex-col">
                            {
                                reminderTimeOptions.map(option => (
                                    <li key={option}>
                                        <button type="button" className="p-2 hover:bg-gray-5 rounded-lg text-sm"
                                            onClick={() => {
                                                addReminder(option)
                                                hideOptions();
                                            }}
                                        >{option}</button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
