"use client"
import Button from "@/app/components/form/Button"
import Image from "next/image"
import { Day } from "@/app/types"
import { Edit_Pencil_16_White } from "@/app/assets/icons"
import { FormEvent } from "react"
type Props = { day: Day }

export function JournalNote({ day }: Props) {
    const date = new Intl.DateTimeFormat("us-US", {
        month: "long",
        day: "numeric",
        weekday: "short",
        year: "numeric"
    }).format(new Date(day.date))

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <section className="flex flex-col h-full w-full gap-3">
            <h2 className="text-base font-bold capitalize">{date}</h2>
            <form className="flex flex-col h-full gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-full gap-1">
                    <textarea className="border-2 h-full text-base rounded-lg p-3 border-primary-100 text-primary-900/80 focus:outline-primary-300 w-full" placeholder={"Type your note here ..."}></textarea>
                </div>
                <Button label="Save Changes" isSubmit={true}>
                    <Image src={Edit_Pencil_16_White} alt="" />
                </Button>
            </form>
        </section >
    )
}
