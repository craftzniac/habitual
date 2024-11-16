"use client"
import { Edit_Pencil_16, Edit_Pencil_16_White, Save_16 } from "@/app/assets/icons"
import { Profile_Image } from "@/app/assets/illustrations"
import Button from "@/app/components/presentation/form/Button"
import TextField from "@/app/components/presentation/form/TextField"
import { navPaths } from "@/app/utils/constants"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Settings() {
    const router = useRouter();
    return (
        <section className="w-full h-full flex flex-col items-center overflow-y-auto p-4 gap-8">
            <ProfileImage />
            <section className="flex flex-col gap-4 w-full">
                <h2 className="font-bold text-lg">Account Info</h2>
                <div className="flex flex-col gap-3">
                    <div className="flex w-full items-end gap-1">
                        <TextField label="Username" name="username" />
                        <Button label="Save">
                            <Image src={Save_16} alt="" className="" />
                        </Button>
                    </div>
                    <div className="flex w-full items-end gap-1">
                        <TextField label="Email Address" name="email" />
                        <Button label="Change" onClick={() => {
                            router.push(navPaths.SETTINGS.VERIFY_EMAIL.INDEX)
                        }}>
                            <Image src={Edit_Pencil_16_White} alt="" />
                        </Button>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-4 w-full">
                <h2 className="font-bold text-lg">Change Password</h2>
                <div className="flex flex-col gap-3">
                    <TextField label="Old Password" name="oldPassword" />
                    <TextField label="New Password" name="newPassword" />
                    <Button label="Update Password" stretch>
                        <Image src={Edit_Pencil_16_White} alt="" />
                    </Button>
                </div>
            </section>
        </section >
    )
}

function ProfileImage() {
    return (
        <div className="w-32 h-32 min-h-32 min-w-32 rounded-full relative overflow-hidden flex justify-center items-center group">
            <Image src={Profile_Image} alt="user profile image" className="relative z-0 w-full h-full" />
            <button type="button" className="flex items-center justify-center gap-1 absolute right-0 left-0 bottom-0 w-full bg-primary-50/60 px-2 pt-2 pb-4 z-10 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform">
                <Image src={Edit_Pencil_16} alt="" className="w-4 h-4" />
                <span className="text-base">Edit</span>
            </button>
        </div>
    )
}
