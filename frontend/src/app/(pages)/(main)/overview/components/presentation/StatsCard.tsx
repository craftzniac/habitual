type Props = {
    title: string,
    val: number,
    gridArea: string,
    extraText?: string,
    isPercent?: boolean
}
export default function StatsCard({ title, val, gridArea, extraText, isPercent = false }: Props) {
    return (
        <div style={{ gridArea }} className="rounded-2xl flex flex-col justify-between gap-4 p-4 bg-gray-5 w-full 2xl:p-8">
            <p className="text-gray-75 font-bold text-sm 2xl:text-base">{title}</p>
            <strong className="font-bold text-[2rem] 2xl:text-[2.5rem] 3xl:text-[3rem]">{val}{isPercent && "%"}</strong>
            <p className="text-primary-900/50 normal-case line-clamp-2">{extraText}</p>
        </div>
    )
}
