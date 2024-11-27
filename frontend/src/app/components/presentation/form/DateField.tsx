import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
    label: string,
    name: string,
    type?: "password" | "text",
    errMsg?: string,
    placeholder?: string
    register: UseFormRegisterReturn
}

export default function DateField({ label, name, type = "text", errMsg, placeholder, register }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <input type="date" id={name} className="border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full" {...register} />
            <p className={`text-xs text-red`}>{errMsg}</p>
        </div>
    )
}
