"use client"
import { Plus_16_White } from "@/app/assets/icons";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/app/components/hooks/useIsDesktop";
import Button from "@/app/components/presentation/form/Button";
import AddHabitForm from "../logic/AddHabitForm";
import { useEffect, useState } from "react";

export default function AddHabitBtn() {
    const { isDesktop } = useIsDesktop();
    const router = useRouter();
    const [isShowForm, setIsShowForm] = useState(false);


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
            // navigate to the add habit page
            router.push("/habits/new")
        }
    }

    return (
        <>
            {
                isDesktop && isShowForm && (
                    <AddHabitForm close={() => setIsShowForm(false)} />
                )
            }
            <Button label="Add a Habit"
                onClick={handleClick}>
                <Image src={Plus_16_White} alt="plus icon" />
            </Button>
        </>
    )
}
