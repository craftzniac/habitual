"use client"
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/app/contexts/UserProvider";

export default function UserProfileBtn({ variant }: {
    variant: "short" | "long",
}) {
    const user = useUserContext();
    return (
        <Link href="/settings" className="flex items-center gap-3 justify-center">
            {
                user.profileImage ? (
                    <Image src={user.profileImage} className="w-8 h-8 min-w-8 min-h-8 lg:w-10 lg:h-10 lg:min-w-10 lg:min-h-10 rounded-full border-2 border-gray-25" alt="profile picture" width={200} height={200} />
                ) : (
                    <span className="w-8 h-8 min-w-8 min-h-8 lg:w-10 lg:h-10 lg:min-w-10 lg:min-h-10 rounded-full border-2 border-gray-25 text-gray-50 text-base bg-primary-500/10 flex justify-center items-center">
                        {user.username[0].toUpperCase()}
                    </span>
                )
            }
            {
                variant === "long" && <span className="hidden 3xl:block font-bold text-base w-full">{user.username}</span>
            }
        </Link>
    )
}
