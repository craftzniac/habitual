import { Message_Request_24 } from "@/app/assets/icons"
import { navPaths } from "@/app/data"
import Image from "next/image"
import Link from "next/link"

type Props = { requestCount: number }

export default function MessageRequestsButton({ requestCount }: Props) {
    return (
        <Link href={navPaths.HABIT_BUDDIES.MESSAGE_REQUESTS} className="flex items-center gap-2 justify-between">
            <div className="flex items-center w-full gap-2">
                <Image src={Message_Request_24} alt="" />
                <span className="text-base font-bold">Message Requests</span>
            </div>
            {
                requestCount > 0 && <span className="rounded-full p-1 w-6 h-6 text-white bg-primary-300 flex justify-center items-center text-xs">{requestCount}</span>
            }
        </Link>
    )
}
