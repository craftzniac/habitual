"use client"
import Button from "@/app/components/presentation/form/Button"
import { useGlobalContext } from "../../contexts/GlobalProvider"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/logic/toast";
import { deleteHabitAction } from "@/app/server-actions/habitActions";

export default function DeleteHabitConfirmDialogWrapper() {
    const { isHabitDeleteDialogOpen } = useGlobalContext();
    return (
        isHabitDeleteDialogOpen && <DeleteHabitConfirmDialog />
    )
}

function DeleteHabitConfirmDialog() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { closeHabitDeleteDialog: close } = useGlobalContext();
    const params = useParams();
    const habitId = params.id;
    const { toast } = useToast();
    const router = useRouter();

    async function triggerDelete() {
        if (!habitId) {
            toast("No habit set for delete", { type: "error" });
            return;
        }
        setIsDeleting(true);
        const errorMsg = await deleteHabitAction(habitId as string);
        if (errorMsg) {
            toast(errorMsg, { type: "error" });
        } else {
            toast("Habit successfully deleted!");
            router.push("/habits?filter=today");
        }
        setIsDeleting(false);
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-[black]/20 overflow-y-auto flex justify-center items-center p-2 z-40">
            <div className="rounded-2xl flex flex-col bg-white opacity-100 gap-4 p-4 border-2 border-primary-100">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold line-clamp-2 w-full">Delete Habit?</h2>
                    <p className="text-base text-gray-75 line-clamp-3 w-full">All your progress for this habit will be lost</p>
                </div>
                {
                    isDeleting ? (
                        <p className="text-gray-75 text-center w-full">Please wait...deleting habit...</p>
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
