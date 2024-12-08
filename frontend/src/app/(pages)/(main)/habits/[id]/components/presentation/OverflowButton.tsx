"use client"
import { Edit_Pencil_16, Trash_16, Journal_16, Reminder_Clock_16, Overflow_24, Info_16 } from "@/app/assets/icons"
import Link from "next/link"
import Image from "next/image"
import { forwardRef, LegacyRef, useEffect, useRef, useState } from "react"

type Props = {
    habitId: string
}

const OverflowMenu = forwardRef(({ habitId, isOpen }: { habitId: string, isOpen: boolean }, ref: LegacyRef<HTMLElement>) => {
    function triggerDelete() {
        alert("Trigger delete of habit")
    }

    const menuItems = [
        {
            title: "habit info",
            link: `/habits/${habitId}/habit-info`,
            icon: Info_16,
        },
        {
            title: "journal",
            link: `/habits/${habitId}/journal`,
            icon: Journal_16,
        },
        {
            title: "edit",
            link: `/habits/${habitId}/edit`,
            icon: Edit_Pencil_16,
        },
    ]
    return (
        <nav ref={ref} className={`relative flex flex-col p-2 w-[12rem] rounded bg-white shadow ${isOpen ? "" : "hidden"}`}>
            <ul className="flex flex-col">
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
});

OverflowMenu.displayName = "OverflowMenu";


export default function OverflowButton({ habitId }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        function onClickOutside(this: Document, event: MouseEvent): void {
            if (ref.current && ref.current.contains(event.target as Node) === false) {
                // user clicked outside the menu. close it
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    }, [])

    return (
        <div className="relative flex flex-col items-end z-20">
            <button className="relative p-1" type="button" onClick={() => {
                //toggle button
                setIsOpen((prev) => !prev)
            }}>
                <Image src={Overflow_24} alt="" className="w-8 h-8" />
            </button>
            <div className="absolute top-9 right-1">
                <OverflowMenu isOpen={isOpen} habitId={habitId} ref={ref} />
            </div>
        </div>
    )
}

