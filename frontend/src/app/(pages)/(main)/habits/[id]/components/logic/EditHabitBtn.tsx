"use client"
import { Edit_Pencil_24, Plus_16_White } from "@/app/assets/icons";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/app/components/hooks/useIsDesktop";
import EditHabitForm from "../../../components/logic/EditHabitForm";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/(pages)/(main)/contexts/GlobalProvider";

export default function EditHabitBtn() {
    const { isDesktop } = useIsDesktop();
    const router = useRouter();
    const [isShowForm, setIsShowForm] = useState(false);
    const { habit } = useGlobalContext();

    // automatically close form on mobile
    useEffect(() => {
        if (isDesktop === false) {
            setIsShowForm(false);
        }
    }, [isDesktop])

    function handleClick() {
        if (isDesktop) {
            //open pop up for add habit
            setIsShowForm(true);
        } else {
            // navigate to the edit habit page
            router.push(`/habits/${habit.id}/edit`)
        }
    }

    return (
        <>
            {
                isDesktop && isShowForm && (
                    <EditHabitForm close={() => setIsShowForm(false)} />
                )
            }
            <button onClick={handleClick} type="button" className="px-6 py-3 flex items-center gap-1 hover:bg-primary-900/5 transition-colors duration-200 justify-center rounded-full">
                <Image src={Edit_Pencil_24} alt="pencil" className="w-5 h-5" />
                <span>Edit</span>
            </button>
        </>
    )
}
