import Link from "next/link"
import { habitSegBtns } from "@/app/utils/constants"
import { THabitFilter } from "@/app/utils/types"

export default function SegmentBtns({ filter }: { filter: THabitFilter }) {
    return (
        <div className="flex items-center gap-2 w-full">
            {
                habitSegBtns.map(item => (
                    <Link href={`/habits?filter=${item.filter}`} key={item.text} type="button" className={`rounded-2xl text-sm px-4 py-2 ${filter === item.filter ? "bg-primary-500/40" : "bg-primary-50"}`}
                    >{item.text}</Link>
                ))
            }
        </div>
    )
}
