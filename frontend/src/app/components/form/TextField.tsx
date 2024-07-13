type Props = {
    label: string,
    name: string,
    type?: "password" | "text",
    infoText?: string,
    infoTextType?: "error" | "info"
    placeholder?: string
}

export default function TextField({ label, name, type = "text", infoText, infoTextType = "error", placeholder }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-[0.81rem] font-bold">{label}</label>
            <input placeholder={placeholder || ""} id={name} type={type} className="border-2 text-[0.81rem] rounded-lg p-3 border-primary-100 w-full" />
            {
                infoText && (
                    <p className={`text-xs ${infoTextType === "error" ? "text-red" : "text-primary-500"}`}>{infoText}</p>
                )
            }
        </div >
    )
}
