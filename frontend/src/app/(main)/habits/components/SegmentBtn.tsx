"use client"
import Link from "next/link"

type Props = {
    segBtn: {
        text: string,
        filter: string
    },
    currentFilter: string
}

export default function SegmentBtn({ segBtn: { text, filter }, currentFilter }: Props) {
    const isSelected = currentFilter === filter
    return (
        <Link
            href={`/habits?filter=${filter}`}
            className={`flex rounded-2xl px-4 py-2 whitespace-pre ${isSelected ? "bg-primary-700 text-primary-50" : "bg-primary-50 text-primary-900"}`}
        >
            {text}
        </Link>
    )
}
