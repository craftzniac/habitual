import Image from "next/image"
import { messageRequests } from "@/app/data"
import { Check_16_White, X_16_White } from "@/app/assets/icons"
import HabitCard from "../../components/HabitCard"

export default function MessageRequests() {
    return (
        <section className="w-full h-full px-4">
            <ul className="flex flex-col gap-8">
                {
                    messageRequests.map(msgReq => (
                        <li key={msgReq.id}>
                            <MessageRequestCard msgReq={msgReq} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

function MessageRequestCard({ msgReq }: { msgReq: typeof messageRequests[0] }) {
    return (
        <div className="flex flex-col gap-3">
            {/* first row */}
            <div className="flex items-center w-full gap-3">
                <div className="flex items-center w-full gap-3">
                    <div className={`rounded-full border-4 ${msgReq.author.isOnline ? "border-primary-300" : "border-gray-25"}`}>
                        <Image src={msgReq.author.profileImage} alt={`${msgReq.author.username}'s profile picture`} className="rounded-full w-12 h-12 min-w-12" />
                    </div>

                    <p className="font-bold">{msgReq.author.username}</p>
                </div>

                <div className="flex gap-2">
                    <button type="button" className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                        <Image src={Check_16_White} alt="" />
                    </button>
                    <button type="button" className="w-10 h-10 bg-red rounded-full flex items-center justify-center">
                        <Image src={X_16_White} alt="" />
                    </button>
                </div>
            </div>

            {/* second row */}
            <p>{msgReq.message}</p>

            {/* third row */}
            <HabitCard habit={msgReq.taggedHabit} showStats variant="secondary" />
        </div>
    )
}
