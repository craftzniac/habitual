"use client";
import Button from "@/app/components/presentation/form/Button";
import Image from "next/image";
import { Trash_16_White } from "@/app/assets/icons";
import { useAccountDeleteContext } from "@/app/contexts/AccountDeleteProvider";

export default function TriggerAccountDeleteBtn() {
    const { openAccountDeleteDialog, isAccountDeleteDialogOpen: isOpen } = useAccountDeleteContext();

    return (
        <div className="flex flex-col gap-3">
            <Button label="Delete my account" variant="delete" onClick={openAccountDeleteDialog}>
                <Image src={Trash_16_White} alt="" className="min-w-4 min-h-4" />
            </Button>
        </div>
    )
}
