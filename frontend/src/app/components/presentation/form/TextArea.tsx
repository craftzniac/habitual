import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
    label: string,
    name: string,
    errMsg?: string,
    placeholder?: string,
    register: UseFormRegisterReturn
}

export default function TextArea({ label, name, placeholder, errMsg, register }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <textarea id={name} placeholder={placeholder || ""} className="border-[1px] text-sm rounded-lg p-3 h-24 border-gray-25 w-full resize-none"
                {...register}
            ></textarea>
            <p className={`text-xs text-red`}>{errMsg}</p>
        </div>
    )
}
