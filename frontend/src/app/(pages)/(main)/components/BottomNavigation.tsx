"use client"
import Image from "next/image"
import Link from "next/link"
import { navItems, navPaths } from "@/app/data"
import { usePathname } from "next/navigation"

export default function BottomNavigation() {
    const currentPath = usePathname();
    if (currentPath.startsWith(navPaths.HABIT_BUDDIES.INDEX)) {
        if (currentPath !== navPaths.HABIT_BUDDIES.INDEX) {
            return null
        }
    }
    return (
        <nav className="flex w-full px-4 py-2 bg-gray-2 lg:hidden">
            <ul className="flex items-center w-full justify-between gap-1">
                {navItems.map(item => (
                    <li key={item.path}>
                        <Link href={item.path} className="text-xs flex flex-col justify-center items-center">
                            {
                                currentPath.startsWith(item.path) ? (
                                    <>
                                        <Image src={item.iconPurple} alt={`${item.label} icon`} />
                                        <span className="text-primary-500">{item.label}</span>
                                    </>
                                ) : (
                                    <Image src={item.iconGray} alt={`${item.label} icon`} />
                                )
                            }
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
