type Props = {
    title: string,
    val: string,
    otherVal?: string
}
export default function StatsCard({ title, val, otherVal = "" }: Props) {
    return (
        <div className="rounded-2xl flex flex-col justify-between gap-4 p-4 bg-gray-5">
            <p className="text-gray-75 font-bold text-sm">{title}</p>
            <span className="flex items-center gap-2">
                <strong className="font-bold text-[2rem]">{val}</strong>
                <span className="">{otherVal}</span>
            </span>
        </div>
    )
}
