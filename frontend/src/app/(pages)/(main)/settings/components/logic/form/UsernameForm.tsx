"use client";
import { Save_16 } from "@/app/assets/icons";
import { useUserContext } from "@/app/contexts/UserProvider";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import updateUsernameAction from "@/app/server-actions/updateUsernameAction"
import { useToast } from "@/app/components/logic/toast";

export default function UsernameForm() {
    const { toast } = useToast();
    const user = useUserContext();
    const [username, setUsername] = useState(user.username);
    const [errorTxt] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => console.log("isUpdating:", isUpdating), [isUpdating])
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!username) {
            toast("Username cannot be empty", { type: "error" })
            return;
        }
        setIsUpdating(true);
        const res = await updateUsernameAction(username.trim());
        setIsUpdating(false);
        if (typeof res === "string") {
            user.updateUsername(res);
            toast("Username updated successfully!")
        } else {
            toast("Could not update username", { type: "error" })
        }
    }
    return (
        <form className="flex w-full items-end gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1">
                <label htmlFor="username" className="text-sm font-bold">Username</label>
                <input
                    id="username"
                    className="border-[1px] text-sm rounded-lg p-3 border-gray-25 w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className={`text-xs text-red`}>{errorTxt}</p>
            </div>
            <button disabled={isUpdating} type="submit" className="bg-primary-500 px-6 py-4 mb-1 rounded-full">
                <Image src={Save_16} alt="" className="min-w-4 min-h-4" />
            </button>
        </form>
    )
}
