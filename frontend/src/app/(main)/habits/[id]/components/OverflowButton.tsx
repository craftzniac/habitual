import { Edit_Pencil_16, Trash_16, Journal_16, Reminder_Clock_16, Overflow_24 } from "@/app/assets/icons"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

type Props = {
    habitId: string
}

function OverflowMenu({ habitId, isOpen }: { habitId: string, isOpen: boolean }) {
    function triggerDelete() {
        alert("Trigger delete of habit")
    }

    const menuItems = [
        {
            title: "journal",
            link: `/habits/${habitId}/journal`,
            icon: Journal_16,
        },
        {
            title: "reminders",
            link: `/habits/${habitId}/reminders`,
            icon: Reminder_Clock_16,
        },
        {
            title: "edit",
            link: `/habits/${habitId}/edit`,
            icon: Edit_Pencil_16,
        },
    ]
    return (
        <nav className={`flex flex-col p-2 rounded bg-white shadow ${isOpen ? "" : "hidden"}`}>
            <ul className="flex flex-col ">
                {
                    menuItems.map(item => (
                        <li key={item.title} className="">
                            <Link href={item.link} className="flex items-center border-b-primary-50 border-b-2 p-3 gap-1">
                                <Image src={item.icon} alt="" />
                                <span className="capitalize text-sm w-full pr-12">{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <button type="button" className="flex items-center p-3 gap-1" onClick={triggerDelete}>
                <Image src={Trash_16} alt="" />
                <span className="capitalize w-full text-start text-sm text-red">delete</span>
            </button>
        </nav >
    )
}


export default function OverflowButton({ habitId }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="relative flex flex-col items-end">
            <button className="relative" type="button" onClick={() => {
                //toggle button
                setIsOpen((prev) => !prev)
            }}>
                <Image src={Overflow_24} alt="" />
            </button>
            <div className="absolute top-9 right-1">
                <OverflowMenu isOpen={isOpen} habitId={habitId} />
            </div>
        </div>
    )
}

