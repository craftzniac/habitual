import { useEffect, useRef, useState } from "react";

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
    const lastOptionRef = useRef<HTMLLIElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

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
            scrollToLastOption()
        }
    }, [isOpen])

    function toggleDropDown() {
        setIsOpen(prev => !prev);
    }

    function closeDropDown() {
        setIsOpen(false);
    }


    function scrollToLastOption() {
        if (lastOptionRef.current) {
            lastOptionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className="flex flex-col w-full gap-1 z-10" ref={ref}>
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col w-full gap-1">
                    <input min={0} type="number" id={name} className={`border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full flex gap-2 items-center `} placeholder="3" onClick={toggleDropDown} onChange={
                        (e) => {
                            onChange(parseInt(e.target.value))
                        }
                    } value={value} />
                    <div className="relative flex flex-col items-end">
                        <div className="absolute  left-0 right-0 top-0  flex flex-col items-start">
                            {
                                isOpen && (
                                    <ul className={`bg-gray-2 border-[1px] border-primary-50 w-full py-2 px-2 rounded-lg flex-col max-h-[12rem] overflow-auto gap-1`}>
                                        {
                                            staticDays.map((duration, index) => (
                                                <li
                                                    key={duration.value}
                                                    ref={index === staticDays.length - 1 ? lastOptionRef : undefined}
                                                >
                                                    <button type="button"
                                                        onClick={() => {
                                                            onChange(duration.value)
                                                            closeDropDown();
                                                        }}
                                                        className={`flex flex-col justify-center p-2 text-start rounded-lg hover:bg-gray-5 w-full text-sm `}
                                                    >
                                                        {duration.label}
                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                )
                            }

                        </div>
                    </div>
                </div>
                <span>days</span>
            </div>
            <p className={`text-xs text-red`}>{errMsg}</p>
        </div>
    )
}


