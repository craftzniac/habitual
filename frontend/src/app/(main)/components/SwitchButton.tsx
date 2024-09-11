"use client"
import { ChangeEvent, useState } from "react"

export default function SwitchButton() {
    const [isOn, setIsOn] = useState(false)
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked
        setIsOn(isChecked);
    }
    return (
        <label className={`rounded-full min-w-16 w-16 transition-all duration-300 ease-in h-8 border-2 flex ${isOn ? "bg-primary-500 border-transparent" : "bg-white border-primary-900/80"}`}>
            <input onChange={handleOnChange} type="checkbox" className="rounded-full border-2 border-red hidden" />
            <span className={`w-7 h-7 rounded-full transition-all duration-300  ease-in ${isOn ? "bg-white translate-x-8" : "bg-primary-900/80 translate-x-0"}`}></span>
        </label>
    )
}
