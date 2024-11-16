"use client"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import Button from "@/app/components/presentation/form/Button"
import TextField from "@/app/components/presentation/form/TextField"
import { navPaths } from "@/app/utils/constants"

export default function NewEmail() {
    const router = useRouter()
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // turn this to a server action
        router.push(navPaths.SETTINGS.INDEX)
    }
    return (
        <section className="flex flex-col gap-4 p-4">
            <p>Enter a new email address and your existing password</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextField name="email" label="Email Address" />
                <TextField name="currentPassword" label="Current Password" />
                <Button label="Done" stretch />
            </form>
        </section >
    )
}
