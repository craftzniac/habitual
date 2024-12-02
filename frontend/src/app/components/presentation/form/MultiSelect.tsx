import Image from "next/image";
import { Angle_Down, Check_16_White } from "@/app/assets/icons";
import { Fragment, useEffect, useRef, useState } from "react";
import { TDayOfWeek } from "@/app/utils/types";
import { daysOfWeekOptions } from "@/app/utils/constants";
import { capitalizeEachWord } from "@/app/utils/helpers/tinyHelpers";

type Props = {
    label: string,
    name: string,
    errMsg?: string,
    placeholder?: string
    value: Set<TDayOfWeek>,
    onChange: (...event: any[]) => void
    onBlur: () => void,
}

export default function MultiSelect({ errMsg, placeholder, name, label, value, onBlur, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onClickOutside(this: Document, event: MouseEvent): void {
            if (ref.current && ref.current.contains(event.target as Node) === false) {
                // user clicked outside the dropdown. close it
                closeDropDown();
                onBlur();
            }
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    }, [onBlur])

    function toggleDropDown() {
        setIsOpen(prev => !prev);
    }

    function closeDropDown() {
        setIsOpen(false);
    }

    function toggleSelection(day: TDayOfWeek, isChecked: boolean) {
        const val = new Set(value);
        if (isChecked) {
            // include the day
            val.add(day);
        } else {
            // remove it
            val.delete(day)
        }
        onChange(val);
    }

    function dayIsSelected(day: TDayOfWeek): boolean {
        const values = Array.from(value);
        for (const d of values) {
            if (d === day) {
                return true
            }
        }
        return false
    }

    const valuesAsString = capitalizeEachWord(Array.from(value).join(", "));

    return (
        <div className="flex flex-col w-full gap-1 z-20" ref={ref}>
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <button id={name} type="button" className={`border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full flex gap-2 items-center `} onClick={toggleDropDown}>
                <span className="w-full text-ellipsis text-start">{value && valuesAsString || placeholder}</span>
                <Image src={Angle_Down} alt="" className={`duration-200 transition-transform ${isOpen ? "-rotate-180" : ""}`} />
            </button>
            <p className={`text-xs text-red`}>{errMsg}</p>
            <div className="relative flex flex-col items-end">
                <div className="absolute  left-0 right-0 top-0  flex flex-col items-start">
                    {
                        isOpen && (
                            <ul className={`flex flex-col bg-gray-2 border-[1px] border-primary-50 w-full p-2 rounded-lg max-h-[12rem] overflow-y-auto gap-1`}>
                                {
                                    daysOfWeekOptions.map(day => (
                                        <Fragment key={day.value}>
                                            <li>
                                                <label
                                                    tabIndex={0}
                                                    className={`cursor-pointer flex  items-center px-2 py-2 gap-2 rounded-lg hover:bg-gray-5 w-full text-sm`}
                                                >
                                                    {/*label*/}
                                                    <span className="w-full text-start text-sm">{day.label}</span>

                                                    {/*checkbox*/}
                                                    <input type="checkbox" className="hidden"
                                                        defaultChecked={
                                                            dayIsSelected(day.value)
                                                        }
                                                        onChange={(e) => {
                                                            toggleSelection(day.value, e.target.checked);
                                                        }}
                                                    />
                                                    <span className={`flex  justify-center items-center p-1 rounded-md border-[1px] border-primary-500 w-6 h-6 ${dayIsSelected(day.value) === true ? "bg-primary-500" : "bg-transparent"}`}>
                                                        <Image src={Check_16_White} alt="checkmark" className="w-4 h-4" />
                                                    </span>
                                                </label>
                                            </li>
                                            {
                                                // TODO: somehow this divider isn't showing up. Not sure why
                                                //
                                                // <div className="w-full flex h-5 bg-primary-500 rounded-full last:hidden"></div>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </ul>

                        )
                    }
                </div>
            </div >
            {
                // <p className={`text-xs text-red`}>{errMsg}</p>
            }
        </div>
    )
}
