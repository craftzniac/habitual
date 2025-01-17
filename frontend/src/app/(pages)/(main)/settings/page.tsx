import { Edit_Pencil_16_White, Save_16, Trash_16_White } from "@/app/assets/icons"
import Button from "@/app/components/presentation/form/Button"
import TextField from "@/app/components/presentation/form/TextField"
import Image from "next/image"
import LogoutBtn from "../components/presentation/LogoutBtn"
import ProfileImage from "./components/presentation/ProfileImage";
import DeleteAccountConfirmDialogWrapper from "./components/logic/DeleteAccountConfirmnDialog";
import TriggerAccountDeleteBtn from "./components/logic/TriggerAccountDeleteBtn";
import UsernameForm from "./components/logic/form/UsernameForm";
import EmailAddressField from "./components/logic/EmailAddressField"

export default function Settings() {
    return (
        <section className="w-full h-full flex flex-col items-center">
            <DeleteAccountConfirmDialogWrapper />
            <header className="flex items-center px-4 py-2 gap-1 w-full lg:py-4">
                <h1 className="text-lg font-bold w-full">Settings</h1>
                <LogoutBtn alwaysShowText={true} />
            </header>
            <div className="w-full h-full overflow-y-auto flex justify-center">
                <section className="h-full w-full  flex flex-col gap-12 px-4 py-4 max-w-[62.5rem] lg:flex-row">
                    <ProfileImage />
                    <div className="flex flex-col w-full h-full gap-12">
                        <section className="flex flex-col gap-4 w-full">
                            <h2 className="font-bold text-lg">Account Info</h2>
                            <div className="flex flex-col gap-3">
                                <UsernameForm />
                                <EmailAddressField />
                            </div >
                        </section >
                        <section className="flex flex-col gap-4 w-full">
                            <h2 className="font-bold text-lg">Change Password</h2>
                            <div className="flex flex-col gap-3">
                                <TextField label="Old Password" name="oldPassword" />
                                <TextField label="New Password" name="newPassword" />
                                <Button label="Update Password">
                                    <Image src={Edit_Pencil_16_White} alt="" />
                                </Button>
                            </div>
                        </section>
                        <section className="flex flex-col gap-4 w-full">
                            <h2 className="font-bold text-lg text-red">Danger Zone</h2>
                            <TriggerAccountDeleteBtn />
                        </section>
                    </div >
                </section >
            </div >
        </section >
    )
}
