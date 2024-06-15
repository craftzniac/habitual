"use client"
import Image from "next/image"
import Link from "next/link"
import { navItems } from "@/app/data"
import { usePathname } from "next/navigation"

export default function BottomNavigation() {
    const currentPath = usePathname();
    return (
        <nav className="flex w-full px-6 py-2 bg-gray-2">
            <ul className="flex items-center w-full justify-between">
                {navItems.map(item => (
                    <li key={item.path} className="flex justify-center items-center">
                        <Link href={item.path} className="text-[0.68rem] flex flex-col justify-center items-center">
                            {
                                currentPath.startsWith(item.path) ? (
                                    <>
                                        <Image src={item.activeIcon} alt={`${item.label} page icon`} />
                                        <span className="text-primary-500">{item.label}</span>
                                    </>
                                ) : (
                                    <Image src={item.icon} alt={`${item.label} page icon`} />
                                )
                            }
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
