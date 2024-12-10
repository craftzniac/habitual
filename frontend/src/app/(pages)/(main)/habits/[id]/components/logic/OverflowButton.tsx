"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import OverflowMenu from "../presentation/OverflowMenu";
import { Overflow_24 } from "@/app/assets/icons";

type Props = {
    habitId: string
}


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
        <div className="2xl:hidden relative flex flex-col items-end z-20">
            <button className="relative p-1" type="button" onClick={() => {
                //toggle button
                setIsOpen((prev) => !prev)
            }}>
                <Image src={Overflow_24} alt="" className="w-8 h-8" />
            </button>
            <div className="absolute top-9 right-1">
                <OverflowMenu isOpen={isOpen} habitId={habitId} ref={ref} close={() => setIsOpen(false)} />
            </div>
        </div>
    )
}

