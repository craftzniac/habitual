"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import MessageRequestsButton from "./components/MessageRequestsButton"
import { habitBuddies, navPaths } from "@/app/data"
import { No_Buddies } from "@/app/assets/illustrations"
import Button from "@/app/components/form/Button"
import { Compass_16_White, Compass_24 } from "@/app/assets/icons"
export default function HabitBuddies() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    // habitBuddies.length = 0
    if (habitBuddies.length === 0) {
        return (
            <section className="w-full h-full px-4 flex flex-col">
                <MessageRequestsButton requestCount={3} />
                <div className="flex flex-col h-full justify-center items-center p-4 gap-4">
                    <Image src={No_Buddies} alt="no buddies" />
                    <p className="text-center max-w-64">You have no buddies to keep you accountable</p>
                    <Button label="Find Habit Buddies">
                        <Image src={Compass_16_White} alt="" />
                    </Button>
                </div>
            </section>
        )
    }
    return (
        <section className="w-full h-full px-4 flex flex-col gap-6">
            <MessageRequestsButton requestCount={3} />
            <ul className="flex flex-col gap-4">
                {
                    habitBuddies.map(buddy => {
                        const lastMessage = buddy.messages[buddy.messages.length - 1]
                        let showLastMessageInfo = false
                        if (lastMessage) {
                            showLastMessageInfo = true
                        }
                        return (
                            <li key={buddy.id}>
                                <Link href={`${navPaths.HABIT_BUDDIES.INDEX}/${buddy.id}`} className={`flex items-center gap-2 w-full`}>
                                    <div className={`rounded-full border-4 ${buddy.isOnline ? "border-primary-300" : "border-gray-25"}`}>
                                        <Image src={buddy.profileImage} alt={`${buddy.username}'s profile picture`} className="rounded-full w-12 h-12 min-w-12" />
                                    </div>
                                    <div className={"flex flex-col w-full"}>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-bold">{buddy.username}</p>
                                            {
                                                showLastMessageInfo && <span className={`text-sm ${buddy.unreadMessageCount > 0 ? "text-primary-300" : "text-gray-75"}`}>{lastMessage.timestamp}</span>
                                            }
                                        </div>
                                        {
                                            showLastMessageInfo && (
                                                <div className="flex items-center ">
                                                    <p className="text-gray-75 flex gap-1 w-full">
                                                        <span className="font-bold">{
                                                            lastMessage.author === "__you__" ? "You" : lastMessage.author
                                                        }:</span>
                                                        <span className="line-clamp-1">{lastMessage.message}</span>
                                                    </p>
                                                    {
                                                        buddy.unreadMessageCount > 0 && (
                                                            <span className="rounded-full p-1 min-w-fit w-5 h-5 text-white bg-primary-300 flex justify-center items-center text-xs">
                                                                {buddy.unreadMessageCount}
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </section >
    )
}
