import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Angle_Down } from "@/app/assets/icons";
import Button from "./Button";

type Props = {
    label: string,
    name: string,
    errMsg?: string,
}

type Option = {
    label: string,
    value: number
}

export default function DurationSelect({ label, name, errMsg }: Props) {
    const staticDays = [
        // { label: "Select", value: -1 },
        { label: "3 days", value: 3 },
        { label: "7 days", value: 7 },
        { label: "14 days", value: 14 },
        { label: "21 days", value: 21 },
        { label: "30 days", value: 30 },
    ]

    const [selectedDuration, setSelectedDuration] = useState<Option | null>(null);

    const [isCustomDaysOpen, setIsCustomDaysOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (isOpen) {
            if (selectedDuration && selectedDuration.label.startsWith("custom")) {
                setIsCustomDaysOpen(true);
            }
        }
    }, [isOpen, selectedDuration]);

    function toggleDropDown() {
        closeCustomDaysDropDown();
        setIsOpen(prev => !prev);
    }

    function closeDropDown() {
        closeCustomDaysDropDown();
        setIsOpen(false);
    }

    function closeCustomDaysDropDown() {
        setIsCustomDaysOpen(false);
    }

    function showCustomDaysInput() {
        setIsCustomDaysOpen(true);
    }


    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <button type="button" className={`border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full flex gap-2 items-center `} onClick={toggleDropDown}>
                <span className="w-full text-ellipsis text-start">{selectedDuration?.label || "Select a duration"}</span>
                <Image src={Angle_Down} alt="" className={`duration-200 transition-transform ${isOpen ? "-rotate-180" : ""}`} />
            </button>
            <div className="relative flex flex-col items-end">
                <div className="absolute  left-0 right-0 top-0  flex flex-col items-start">
                    {
                        isOpen && (
                            <ul className={`bg-gray-2 w-full py-2 px-2 rounded-lg flex-col max-h-[8rem] overflow-auto `}>
                                {
                                    staticDays.map(day => {
                                        return (
                                            <li
                                                key={day.value} value={day.value}
                                                onClick={() => {
                                                    setSelectedDuration(day);
                                                    closeDropDown();
                                                }
                                                }
                                                className={`flex flex-col justify-center px-2 py-2  rounded hover:bg-gray-25/30 w-full text-sm ${selectedDuration?.value === day.value ? "bg-gray-25/50" : ""} `}
                                            >
                                                {day.label}
                                            </li>
                                        )
                                    })
                                }
                                <li
                                    onClick={() => {
                                        showCustomDaysInput();
                                    }}
                                    className={`flex  items-center px-2 py-2 rounded hover:bg-gray-25/30 w-full text-sm ${selectedDuration?.label.startsWith("custom") ? "bg-gray-25/50" : ""}`}
                                >
                                    custom
                                </li>
                            </ul>

                        )
                    }
                    {
                        isCustomDaysOpen && (
                            <CustomDaysCountInput
                                setSelectedDuration={setSelectedDuration}
                                close={closeDropDown}
                                initialSelectedDuration={selectedDuration}
                            />
                        )
                    }
                </div>
            </div >
            {
                errMsg && (
                    <p>{errMsg}</p>
                )
            }
        </div>
    )
}

function CustomDaysCountInput({ setSelectedDuration, close, initialSelectedDuration }: { setSelectedDuration: Dispatch<SetStateAction<Option | null>>, close: () => void, initialSelectedDuration: Option | null }) {
    const [daysCount, setDaysCount] = useState<number | null>(
        (initialSelectedDuration !== null && initialSelectedDuration.label.startsWith("custom"))
            ? initialSelectedDuration.value : null
    );
    const [errMsg, setErrMsg] = useState("");

    return (
        <div className={`flex flex-col p-2 rounded-lg bg-white border-[1px] border-gray-5 gap-2 w-fit `}>
            <div className="flex items-center gap-2">
                <input type="number" className="border-[1px] text-xs rounded-lg p-2 border-gray-25 w-full" value={daysCount || ""} onChange={(e) => {
                    // reject negative values
                    let val;
                    try { val = parseInt(e.target.value); } catch (err) { setErrMsg("Invalid input"); return; }
                    if (val <= 0) { setErrMsg("Invalid input"); return; }
                    if (val > 100) { setErrMsg("Values must be between 1 and 100"); return; }
                    setErrMsg("");
                    setDaysCount(val);
                }} />
                <span>days</span>
            </div>
            {
                errMsg && (
                    <p className="text-xs text-red">{errMsg}</p>
                )
            }
            <div className="flex items-center w-full">
                <Button label="Cancel" variant="text-btn" isSubmit={false} stretch onClick={() => {
                    close();
                }}
                />
                <Button label="Ok" isSubmit={false} stretch onClick={() => {
                    if (daysCount) {
                        setSelectedDuration({ label: `custom - ${daysCount} days`, value: daysCount });
                    }
                    close();
                }} />
            </div>
        </div>
    )
}
