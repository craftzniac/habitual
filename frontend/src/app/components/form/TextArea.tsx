type Props = {
    label: string,
    name: string,
    errMsg?: string,
    placeholder?: string
}

export default function TextArea({ placeholder, label, name, errMsg }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-[0.81rem] font-bold">{label}</label>
            <textarea id={name} placeholder={placeholder || ""} className="border-2 text-[0.81rem] rounded-lg p-3 h-24 border-primary-100 w-full"></textarea>
            {
                errMsg && (
                    <p>{errMsg}</p>
                )
            }
        </div>
    )
}
