"use client"

import SwitchButton from "@/app/(main)/components/SwitchButton"
import { Edit_Pencil_16, X_16_Red } from "@/app/assets/icons"
import { Profile_Image } from "@/app/assets/illustrations"
import Button from "@/app/components/form/Button"
import { habitBuddies, habits } from "@/app/data"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function BuddySettings() {
    const router = useRouter();
    const habitBuddy = habitBuddies[1]
    return (
        <section className="w-full h-full flex flex-col items-center overflow-y-auto p-4 gap-8">
            <div className="flex items-center justify-center flex-col">
                <ProfileImage showEditBtn={false} />
                <h2 className="font-bold text-lg">{habitBuddy.username}</h2>
            </div>
            <label className="flex gap-2 items-center w-full">
                <p className="font-bold w-full">Remove Buddy</p>
                <Button variant="delete" label="Remove" stretch={false} />
            </label>
            <label className="flex gap-2 items-center w-full">
                <p className="font-bold w-full">Turn off email notifications</p>
                <SwitchButton />
            </label>
            <section className="flex flex-col w-full gap-2 ">
                <h3 className="font-bold">Manage habit visibility</h3>
                <p>Control what habits <strong>{habitBuddy.username}</strong> can view</p>
            </section>
            <section className="flex flex-col w-full gap-4">
                <h3 className="font-bold text-sm">Selected 3 habits</h3>
                <ul className="flex flex-col gap-2">
                    {
                        habits.map(habit => (
                            <li key={habit.id} className="">
                                <div className="flex w-full items-start gap-2">
                                    <div className="flex flex-col gap-[0.125rem] w-full">
                                        <p className="text-base">{habit.title}</p>
                                        <p className="text-gray-75 text-xs line-clamp-2">{habit.description}</p>
                                    </div>
                                    <button type="button" className="w-8 h-8 flex items-center justify-center">
                                        <Image src={X_16_Red} alt="" className="" />
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex w-full justify-start">
                    <Button label="Save" stretch={false} />
                    <Button label="Cancel" variant="text-btn" stretch={false} />
                </div>
            </section>
        </section >
    )
}

function ProfileImage({ showEditBtn = true }: { showEditBtn?: boolean }) {
    return (
        <div className="w-32 h-32 min-h-32 min-w-32 rounded-full relative overflow-hidden flex justify-center items-center group">
            <Image src={Profile_Image} alt="user profile image" className="relative z-0 w-full h-full" />
            {
                showEditBtn && (
                    <button type="button" className="flex items-center justify-center gap-1 absolute right-0 left-0 bottom-0 w-full bg-primary-50/60 px-2 pt-2 pb-4 z-10 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Image src={Edit_Pencil_16} alt="" className="w-4 h-4" />
                        <span className="text-base">Edit</span>
                    </button>
                )
            }
        </div>
    )
}
