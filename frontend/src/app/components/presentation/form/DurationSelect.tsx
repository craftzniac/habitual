import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Angle_Down } from "@/app/assets/icons";
import Button from "./Button";
import { createCustomDurationOption, isDurationValid } from "@/app/utils/helpers/tinyHelpers";
import { TDurationSelectOption as Option } from "@/app/utils/types";

type Props = {
    label: string,
    name: string,
    errMsg?: string,
    onChange: (...event: any[]) => void,
    onBlur: () => void,
    value?: number
}

const staticDays = [
    // { label: "Select", value: -1 },
    { label: "3 days", value: 3 },
    { label: "7 days", value: 7 },
    { label: "14 days", value: 14 },
    { label: "21 days", value: 21 },
    { label: "30 days", value: 30 },
]

export default function DurationSelect({ label, name, errMsg, onChange, value, onBlur }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [selectedDuration, setSelectedDuration] = useState<Option | null>(() => {
        //make sure the value is valid, else set an empty value
        const val = isDurationValid(value);
        if (typeof val === "string") {
            return null;   // the value is invalid.
        }

        // find corresponding value from staticDays
        const matchingDay = staticDays.find(d => d.value === value);
        if (matchingDay) {
            return matchingDay
        }

        // the value must be a custom days value
        return createCustomDurationOption(val);
    });

    const [isCustomDaysOpen, setIsCustomDaysOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // update the form state whenever selectDuration is set
    useEffect(() => {
        onChange(selectedDuration?.value)
    }, [selectedDuration, onChange])

    // event listener to close dropdown when user clicks outside the component.
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

    useEffect(() => {
        if (isOpen) {
            if (selectedDuration && selectedDuration.label.startsWith("custom")) {
                setIsCustomDaysOpen(true);
            }
        }
    }, [isOpen, selectedDuration]);

    function toggleDropDown() {
        setIsCustomDaysOpen(false);
        setIsOpen(prev => !prev);
    }

    function closeDropDown() {
        setIsCustomDaysOpen(false);
        setIsOpen(false);
    }

    function showCustomDaysInput() {
        setIsCustomDaysOpen(true);
    }

    function selectDuration(duration: Option) {
        setSelectedDuration(duration);
        closeDropDown();
    }

    return (
        <div className="flex flex-col w-full gap-1 z-10" ref={ref}>
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <button id={name} type="button" className={`border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full flex gap-2 items-center `} onClick={toggleDropDown}>
                <span className="w-full text-ellipsis text-start">{selectedDuration?.label || "Select a duration"}</span>
                <Image src={Angle_Down} alt="" className={`duration-200 transition-transform ${isOpen ? "-rotate-180" : ""}`} />
            </button>
            <div className="relative flex flex-col items-end">
                <div className="absolute  left-0 right-0 top-0  flex flex-col items-start">
                    {
                        isOpen && (
                            <ul className={`bg-gray-2 border-[1px] border-primary-50 w-full py-2 px-2 rounded-lg flex-col max-h-[12rem] overflow-auto gap-1`}>
                                {
                                    staticDays.map(duration => (
                                        <li
                                            key={duration.value}
                                        >
                                            <button type="button"
                                                onClick={() => selectDuration(duration)}
                                                className={`flex flex-col justify-center p-2 text-start rounded-lg hover:bg-gray-5 w-full text-sm ${selectedDuration?.value === duration.value ? "bg-gray-5" : "bg-transparent"} `}
                                            >
                                                {duration.label}
                                            </button>
                                        </li>
                                    ))
                                }
                                <li
                                    onClick={showCustomDaysInput}
                                    className={`flex  items-center px-2 py-2 rounded hover:bg-gray-5 w-full text-sm ${selectedDuration?.label.startsWith("custom") ? "bg-gray-5" : "bg-transparent"}`}
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
            </div>
            <p className={`text-xs text-red`}>{errMsg}</p>
        </div>
    )
}


function CustomDaysCountInput({ setSelectedDuration, close, initialSelectedDuration }: { setSelectedDuration: Dispatch<SetStateAction<Option | null>>, close: () => void, initialSelectedDuration: Option | null }) {
    const [durationInDays, setDurationInDays] = useState<number | null>(
        (initialSelectedDuration !== null && initialSelectedDuration.label.startsWith("custom"))
            ? initialSelectedDuration.value : null
    );
    const [errMsg, setErrMsg] = useState("");

    return (
        <div className={`flex flex-col p-2 rounded-lg border-[1px] border-primary-50 bg-gray-2 gap-2 w-full`}>
            <div className="flex items-center gap-2">
                <input type="number" className="border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full" value={durationInDays || ""} onChange={(e) => {
                    const value = isDurationValid(e.target.value);
                    if (typeof value === "number") {
                        setErrMsg("");
                        setDurationInDays(value);
                    } else {
                        setErrMsg(value);
                    }
                }} />
                <span>days</span>
            </div>
            <p className={`text-xs text-red`}>{errMsg}</p>
            <div className="flex items-center justify-end w-full">
                <Button label="Cancel" variant="text-btn" isSubmit={false} onClick={() => {
                    close();
                }}
                />
                <Button label="Ok" variant="text-btn" isSubmit={false} onClick={() => {
                    if (durationInDays) {
                        setSelectedDuration(
                            createCustomDurationOption(durationInDays)
                        );
                    }
                    close();
                }} />
            </div>
        </div>
    )
}
