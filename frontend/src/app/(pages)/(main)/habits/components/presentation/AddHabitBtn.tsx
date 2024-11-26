"use client"
import { Plus_16_White } from "@/app/assets/icons";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/app/components/hooks/useIsDesktop";
import Button from "@/app/components/presentation/form/Button";

export default function AddHabitBtn() {
    const { isDesktop } = useIsDesktop();
    const router = useRouter();

    function handleClick() {
        if (isDesktop) {
            //open pop up for add habit
        } else {
            // navigate to the add habit page
            router.push("/habits/new")
        }
    }

    return (
        <Button label="Add a Habit"
            onClick={handleClick}>
            <Image src={Plus_16_White} alt="plus icon" />
        </Button>
    )
}
