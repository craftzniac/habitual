"use client"
import { Edit_Pencil_16, Trash_16, Journal_16, Info_16 } from "@/app/assets/icons"
import Link from "next/link"
import Image from "next/image"
import { forwardRef, LegacyRef } from "react"
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider"

const OverflowMenu = forwardRef(({ habitId, isOpen, close: closeOverflow }: { habitId: string, isOpen: boolean, close: () => void }, ref: LegacyRef<HTMLElement>) => {
    const { openHabitDeleteDialog } = useGlobalContext();

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
                        <li key={item.title} className="" onClick={() => closeOverflow()}>
                            <Link href={item.link} className="flex items-center border-b-primary-50 border-b-2 p-3 gap-1">
                                <Image src={item.icon} alt="" />
                                <span className="capitalize text-sm w-full pr-12">{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <button type="button" className="flex items-center p-3 gap-1" onClick={() => {
                closeOverflow();
                openHabitDeleteDialog();
            }}>
                <Image src={Trash_16} alt="" />
                <span className="capitalize w-full text-start text-sm text-red">delete</span>
            </button>
        </nav>
    )
});

OverflowMenu.displayName = "OverflowMenu";

export default OverflowMenu
