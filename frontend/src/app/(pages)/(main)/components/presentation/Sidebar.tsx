"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, navPaths } from "@/app/utils/constants"
import Logo from "@/app/assets/logo.svg"
import LogoutBtn from "./LogoutBtn";
import UserProfileBtn from "./UserProfileBtn";

export default function Sidebar() {
    const currentPath = usePathname();
    if (currentPath.startsWith(navPaths.HABIT_BUDDIES.INDEX)) {
        if (currentPath !== navPaths.HABIT_BUDDIES.INDEX) {
            return null
        }
    }
    return (
        <section className="hidden lg:flex flex-col items-center bg-white h-full p-4 gap-8 shadow min-w-fit 3xl:w-[15rem]">
            <div className="flex items-center gap-4 w-full justify-center p-4 3xl:p-4">
                <Image src={Logo} className="min-w-6 min-h-6" alt="logo" />
                <p className="hidden 3xl:block text-2xl font-bold gap-4 w-full">Habitual</p>
            </div>
            <div className="h-full w-full flex flex-col">
                <nav className="flex h-full w-full" >
                    <ul className="flex flex-col gap-2 w-full h-full">
                        {navItems.map(item => (
                            <li key={item.path} className="flex">
                                <Link href={item.path} className={`flex items-center justify-center gap-2 w-full hover:bg-primary-900/10 transition-colors duration-200 px-4 py-3 rounded ${currentPath.startsWith(item.path) ? "bg-primary-700" : "bg-white"}`}>
                                    {
                                        currentPath.startsWith(item.path) ? (
                                            <Image src={item.iconWhite} alt={`${item.label} icon`} width={24} height={24} className="w-auto h-auto" />
                                        ) : (
                                            <Image src={item.iconBlack} alt={`${item.label} icon`} width={24} height={24} className="w-auto h-auto" />
                                        )
                                    }
                                    <span className={`hidden 3xl:block text-sm w-full  ${currentPath.startsWith(item.path) ? "text-white" : "text-primary-900 "}`}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <LogoutBtn />
            </div>
            <div className="w-full">
                <UserProfileBtn variant="long" />
            </div>
        </section>
    )
}

