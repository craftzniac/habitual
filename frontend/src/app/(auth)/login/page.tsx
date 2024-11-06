"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg"
import Link from "next/link"
import TextField from "@/app/components/form/TextField";
import Button from "@/app/components/form/Button";
import { GoogleLogo } from "@/app/assets/icons";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormInputs } from "@/app/types";
import PasswordField from "../components/PasswordField";
import { useToast } from "@/app/components/toast";

export default function Login() {
    const { toast } = useToast();
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            email: "", password: "",
        }
    });
    const router = useRouter();
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsSubmittingForm(true);
        const result = await signIn("credentials", {
            email: data.email, password: data.password, redirect: false
        })
        setIsSubmittingForm(false);
        if (!result) {
            toast("Couldn't complete signin", { type: "error" });
            return;
        }

        if (result.status === 200) {
            toast("Signin successful!");
            reset();
            router.push("/overview")
        } else {
            toast(result.error || "Something went wrong", { type: "error" });
        }
    }
    return (
        <div className="w-full h-fit flex p-4 max-w-[28rem]">
            <main className="w-full h-full flex flex-col items-center gap-4">
                <Image src={Logo} alt="logo" />
                <div className="flex flex-col w-full h-full items-center gap-4">
                    <h1 className="font-bold text-lg">Welcome Back!</h1>
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            register={register("email", {
                                required: "Email must not be empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Email address is not valid"
                                }
                            })}
                            label="Email"
                            name="email"
                            infoText={errors.email?.message}
                        />

                        <PasswordField register={register} errorMsg={errors.password?.message} />

                        <Button label={isSubmittingForm ? "loading..." : "Login"} isSubmit={true} stretch={true} disabled={isSubmittingForm} />
                    </form>
                    <p className="text-[0.81rem] font-bold text-gray-75">Or Continue with</p>
                    <Button variant="gray" label="Google" isSubmit={true} stretch disabled={isSubmittingForm}>
                        <Image src={GoogleLogo} alt="google logo" />
                    </Button>

                    <p className="text-[0.81rem] flex items-center gap-2">
                        <span>Don&apos;t have an account?</span>
                        <Link href="/signup" className="text-primary-500 hover:underline">Create an Account</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
