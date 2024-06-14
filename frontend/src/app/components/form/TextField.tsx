type Props = {
    label: string,
    name: string,
    type?: "password" | "text",
    errMsg?: string
}

export default function TextField({ label, name, type = "text", errMsg }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-[0.81rem] font-bold">{label}</label>
            <input id={name} type={type} className="border-[1px] text-[0.81rem] rounded-lg p-3 border-primary-300 w-full" />
            {
                errMsg && (
                    <p>{errMsg}</p>
                )
            }
        </div >
    )
}
