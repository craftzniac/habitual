"use client";

import { useUserContext } from "@/app/contexts/UserProvider";

export default function EmailAddressField() {
    const user = useUserContext();
    return (
        <div className="flex w-full items-end gap-2">
            <div className="flex flex-col w-full gap-1">
                <label htmlFor="email" className="text-sm font-bold">Email Address</label>
                <input
                    id="email"
                    type="text"
                    className="border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full"
                    disabled
                    defaultValue={user.email}
                />
            </div>
            {
                // <Link href="" type="button" className="bg-primary-500 px-6 py-4 mb-1 rounded-full">
                //     <Image src={Edit_Pencil_16_White} alt="" className="min-w-4 min-h-4" />
                // </Link>
            }
        </div>
    )
}
