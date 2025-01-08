import { Exit_16 } from "@/app/assets/icons"
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function LogoutBtn() {
    return (
        <button className="flex items-center gap-2 justify-start px-3 py-3 w-full rounded hover:bg-primary-50 transition-colors duration-200" onClick={() => signOut()}>
            <Image src={Exit_16} alt="" className="w-6 h-6" width={16} height={16} />
            <span className="hidden 3xl:block font-bold text-sm text-primary-500">Logout</span>
        </button>
    )
}
