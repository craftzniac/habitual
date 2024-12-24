"use client"
import Button from "@/app/components/presentation/form/Button"
import Image from "next/image"
import { Edit_Pencil_16_White } from "@/app/assets/icons"
import { FormEvent } from "react"
import { useJournalContext } from "../../[[...date]]/context/JournalProvider"

export function JournalNote() {
    const { journal } = useJournalContext();
    const date = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
    }).format(new Date(journal.date))

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <section className="flex flex-col h-full w-full gap-3">
            <h2 className="text-base font-bold capitalize">{date}</h2>
            <form className="flex flex-col h-full gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-full gap-1">
                    <textarea className="resize-none h-full text-base rounded-lg p-3 text-primary-900/80 outline  outline-2 outline-gray-75/50 focus:outline-primary-300 w-full" placeholder={"Type your note here ..."} defaultValue={journal.note} >
                    </textarea>
                </div>
                <Button label="Save Changes" isSubmit={true}>
                    <Image src={Edit_Pencil_16_White} alt="" />
                </Button>
            </form>
        </section>
    )
}
