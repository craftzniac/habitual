type Props = {
    label: string,
    name: string,
    errMsg?: string
}

export default function TextArea({ label, name, errMsg }: Props) {
    return (
        <div className="flex flex-col w-full gap-1">
            <label htmlFor={name} className="text-[0.81rem] font-bold">{label}</label>
            <textarea id={name} className="border-[1px] text-[0.81rem] rounded-lg p-3 h-24 border-primary-300 w-full"></textarea>
            {
                errMsg && (
                    <p>{errMsg}</p>
                )
            }
        </div>
    )
}
