"use client"
import Button from "@/app/components/presentation/form/Button";
import TextField from "@/app/components/presentation/form/TextField";
import { navPaths } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function EnterEmailVerificationCode() {
    const router = useRouter();
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // turn this to a server action
        router.push(navPaths.SETTINGS.VERIFY_EMAIL.EMAIL_CODE.NEW_EMAIL)
    }
    return (
        <section className="p-4 flex flex-col gap-4">
            <p className="text-gray-75">Enter the verification code we sent to your email in order to continue</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextField infoTextType="info" label="Verification Code" name="verificationCode" infoText="Resend Verification Code" />
                <Button label="Next" stretch isSubmit />
            </form>
        </section>
    )
}
