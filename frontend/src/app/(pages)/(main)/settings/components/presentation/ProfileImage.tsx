"use client";
import { useUserContext } from "@/app/contexts/UserProvider"

export default function ProfileImage() {
    const { username } = useUserContext();
    return (
        <div className="flex w-full lg:w-fit justify-center">
            <div className="w-32 h-32 min-h-32 min-w-32 lg:w-56 lg:h-56 rounded-full relative overflow-hidden flex justify-center items-center group bg-primary-900/20 text-5xl lg:text-7xl font-bold">
                {username[0].toUpperCase()}
            </div>
        </div>
    )
}
