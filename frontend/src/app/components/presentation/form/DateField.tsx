import { useRef } from "react";
import Image from "next/image";
import { Date_Picker } from "@/app/assets/icons";

type Props = {
    label: string,
    name: string,
    errMsg?: string,
    value: string,
    onChange: (...event: any[]) => void
}

function formatForHTMLDateInput(value: string) {
    const dateString = value.split("T")[0];
    return dateString;
}

export default function DateField({ label, name, errMsg, value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    function openPicker() {
        //WARN: might possibly fail on older browsers!!!
        inputRef.current?.showPicker()
    }

    const formatter = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
    })

    const formattedDate = formatter.format(new Date(value));
    return (
        <div className="w-full flex flex-col gap-1 rounded">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <button type="button"
                className="relative rounded-lg text-sm border-[1px] border-gray-25 p-3 text-start flex gap-1 items-center"
                onClick={openPicker}>
                <span className="w-full"> {formattedDate} </span>
                <Image src={Date_Picker} className="w-4 h-4" alt="calendar" />
            </button>
            <input ref={inputRef} type="date" id={name} className="opacity-0 h-0" value={formatForHTMLDateInput(value)} onChange={(e) => {
                console.log(e.target.value)
                onChange(e.target.value)
            }} />
            <p className={`text-xs text-red`}>{errMsg}</p>
        </div>
    )
}
