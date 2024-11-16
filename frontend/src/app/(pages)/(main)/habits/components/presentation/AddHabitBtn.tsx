"use client"
import { Plus_16_White } from "@/app/assets/icons";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/app/components/hooks/useIsDesktop";

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
        <button
            type="button"
            onClick={handleClick}
            className="rounded-full px-6 py-3 flex items-center gap-1 text-sm bg-primary-500 text-white font-bold w-fit">
            <Image src={Plus_16_White} alt="" />
            <span className="">Add Habit</span>
        </button>
    )
}
