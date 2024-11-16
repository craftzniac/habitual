import { TSignupFormInputs } from "@/app/utils/types"
import { Path, UseFormRegisterReturn } from "react-hook-form"

type Props = {
    label: string,
    name: Path<TSignupFormInputs>,
    type?: "password" | "text",
    infoText?: string,
    infoTextType?: "error" | "info"
    placeholder?: string
    register: UseFormRegisterReturn
}

export default function TextField({ label, name, type = "text", infoText, infoTextType = "error", placeholder, register }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <input
                placeholder={placeholder || ""}
                id={name}
                type={type}
                className="border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full"
                {...register}
            />
            <p className={`text-xs ${infoTextType === "error" ? "text-red" : "text-primary-500"}`} >{infoText}</p>
        </div>
    )
}
