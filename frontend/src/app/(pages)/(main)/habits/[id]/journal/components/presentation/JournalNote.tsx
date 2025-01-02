"use client"
import Button from "@/app/components/presentation/form/Button"
import Image from "next/image"
import { Edit_Pencil_16_White } from "@/app/assets/icons"
import { FormEvent, useState } from "react"
import { useJournalContext } from "../../[[...timestamp]]/context/JournalProvider"
import { updateJournalEntryAction } from "@/app/server-actions/habitDayJournalActions"
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider"
import { useToast } from "@/app/components/logic/toast"
import { getUTCDateString } from "@/app/utils/helpers/tinyHelpers"

export function JournalNote() {
    const { toast } = useToast();
    const { habit } = useGlobalContext();
    const { journal, setJournal } = useJournalContext();
    console.log("journal: ", journal);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [journalEntry, setJournalEntry] = useState(journal.note);
    const date = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
    }).format(new Date(journal.timestamp))

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true);
        const res = await updateJournalEntryAction({ note: journalEntry, date: getUTCDateString(new Date(journal.timestamp)), habitId: habit.id });
        if (res.success) {
            toast("Journal Entry updated successfully!");
            // update journal
            setJournal(res.data.entry);
        } else {
            toast("Journal Entry couldn't be updated", { type: "error" });
            // TODO: does this even work to reset the journal???
            setJournal(prev => prev);
        }
        setIsSubmitting(false);
    }

    return (
        <section className="flex flex-col h-full w-full gap-3">
            <h2 className="text-base font-bold capitalize">{date}</h2>
            <form className="flex flex-col h-full gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-full gap-1">
                    <textarea
                        disabled={isSubmitting}
                        className="resize-none h-full text-base rounded-lg p-3 text-primary-900/80 outline  
                        outline-2 outline-gray-75/50 focus:outline-primary-300 w-full"
                        placeholder={"Type your note here ..."}
                        defaultValue={journalEntry}
                    >
                    </textarea>
                </div>
                <Button label="Save Changes" isSubmit={true}
                    disabled={isSubmitting}
                >
                    <Image src={Edit_Pencil_16_White} alt="" />
                </Button>
            </form>
        </section>
    )
}
