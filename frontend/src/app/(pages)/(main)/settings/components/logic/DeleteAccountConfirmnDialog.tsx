"use client"
import Button from "@/app/components/presentation/form/Button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/logic/toast";
import deleteAccountAction from "@/app/server-actions/deleteAccountAction";
import { signOut } from "next-auth/react";
import { useAccountDeleteContext } from "@/app/contexts/AccountDeleteProvider";

export default function DeleteAccountConfirmDialogWrapper() {
    const { isAccountDeleteDialogOpen } = useAccountDeleteContext();
    return (
        isAccountDeleteDialogOpen && <DeleteAccountConfirmDialog />
    )
}

function DeleteAccountConfirmDialog() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { closeAccountDeleteDialog: close } = useAccountDeleteContext();
    const { toast } = useToast();
    const router = useRouter();

    async function triggerDelete() {
        setIsDeleting(true);
        const res = await deleteAccountAction();
        if (res.success === false) {
            toast(res.message, { type: "error" });
        } else {
            toast("Account deleted successfully");
            signOut();
            router.push("/login");
        }
        setIsDeleting(false);
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-[black]/20 overflow-y-auto flex justify-center items-center p-2 z-40">
            <div className="rounded-2xl flex flex-col bg-white opacity-100 gap-4 p-4 border-2 border-primary-100 w-full max-w-[25rem]">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold line-clamp-2 w-full">Delete Account?</h2>
                    <p className="text-base text-gray-75 line-clamp-3 w-full">This action is <strong>irreversible</strong> and all your data will be <strong>lost</strong> ... <strong>forever</strong></p>
                </div>
                {
                    isDeleting ? (
                        <p className="text-gray-75 text-center w-full">Please wait...deleting Account...</p>
                    ) : (
                        <div className="w-full flex justify-end gap-1.5">
                            <button type="button" className="text-red font-bold min-w-fit text-sm py-3 px-6" onClick={triggerDelete}>Yes, Delete</button>
                            <Button label="No, Cancel" onClick={close} />
                        </div>
                    )
                }
            </div >
        </div >
    )
}
