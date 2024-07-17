"use client"
import { habitBuddies } from "@/app/data"
import { User2 } from "@/app/assets/images"
import Image from "next/image"
import { Hook, Paper_Plane_24 } from "@/app/assets/icons"
import { FormEventHandler, KeyboardEventHandler, useRef } from "react"

export default function HabitBuddy() {
    const messages = habitBuddies[0].messages
    const buddy = habitBuddies[0]
    return (
        <section className="w-full h-full   flex flex-col">
            <ul className="flex flex-col gap-8 px-2 h-full overflow-y-auto">
                {messages.map(message => (
                    <li key={message.id}>
                        <ChatMessage key={message.id} message={message} />
                    </li>
                ))}
            </ul>
            <ChatInput buddyUsername={buddy.username} />
        </section>
    )
}

type IChatMessage = typeof habitBuddies[0]["messages"][0]


function getAuthor(username: string) {
    if (username === "__you__") {
        return {
            id: "kansdfiaskdlfjas",
            username: "victor123",
            isOnline: true,
            profileImage: User2,
        }
    } else {
        return habitBuddies.find(buddy => buddy.username === username)
    }
}

function ChatMessage({ message }: { message: IChatMessage }) {
    let author = getAuthor(message.author)
    let replyTo = null
    if (message.replyTo) {
        replyTo = { ...message.replyTo, author: getAuthor(message.replyTo.author) }
    }
    console.log("replyTo: ", replyTo);
    return (
        <div className="flex flex-col">
            {
                message.replyTo && (
                    <div className="flex w-full items-center gap-1 px-5">
                        <Image src={Hook} alt="" className="" />
                        <div className="flex items-center gap-1 mb-2">
                            <Image src={author?.profileImage!} alt={`${author?.username}'s profile picture`} className="rounded-full w-5 h-5 min-w-5" />
                            <div className="flex items-center gap-1 text-[0.8rem]">
                                <p className="font-bold">{author?.username}</p>
                                <p className="line-clamp-1">{message.message}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex items-start gap-3">
                <Image src={author?.profileImage!} alt={`${author?.username}'s profile picture`} className="rounded-full w-12 h-12 min-w-12" />
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center justify-start">
                        <p className="text-sm font-bold">{author?.username}</p>
                        <p className="text-gray-75 text-xs">{message.createdAt}</p>
                    </div>
                    <p className="text-sm leading-[150%]">{message.message}</p>
                </div>
            </div>
        </div >
    )
}

function ChatInput({ buddyUsername }: { buddyUsername: string }) {
    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    const handleOnInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
        if (inputRef.current) {
            inputRef.current.style.height = `${Math.min(e.currentTarget.scrollHeight, 102)}px`
        }
    }

    const handleOnKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        const key = e.key
        if (key === "Backspace" || key === "Delete") {
            if (inputRef.current) {
                inputRef.current.style.height = "auto"
            }
        }
    }

    return (
        <div className="p-2 h-fit flex items-end w-full">
            <div className="rounded-2xl flex items-end bg-primary-50 px-4 py-2 gap-2 w-full">
                <textarea onKeyDown={handleOnKeydown} onInput={handleOnInput} ref={inputRef} rows={1} placeholder={`Send message to ${buddyUsername} `} className="outline-none text-sm w-full resize-none bg-transparent"></textarea>
                <button type="button">
                    <Image src={Paper_Plane_24} className="w-6 h-6 min-w-6" alt="" />
                </button>
            </div>
        </div>
    )
}
