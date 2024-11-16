"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/logo.svg"
import TextField from "@/app/components/presentation/form/TextField";
import Button from "@/app/components/presentation/form/Button";
import { GoogleLogo } from "@/app/assets/icons";
import { TSignupFormInputs } from "@/app/utils/types";
import { signupAction } from "@/app/server-actions/signupAction";
import { useState } from "react";
import { useToast } from "@/app/components/logic/toast";

export default function Signup() {
  const { toast } = useToast();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<TSignupFormInputs> = async (fields) => {
    setIsSubmittingForm(true);
    const res = await signupAction(fields);
    setIsSubmittingForm(false);
    if (res.success === true) {
      toast("Account created successfully!");
      reset();
      router.push("/overview");
    } else {
      toast(res.message, { type: "error" });
    }
  }

  return (
    <div className="w-full h-fit flex p-4 max-w-[28rem]">
      <main className="w-full h-full flex flex-col items-center gap-4">
        <Image src={Logo} alt="logo" />
        <div className="flex flex-col w-full h-full items-center gap-4">
          <h1 className="font-bold text-lg">Create Account</h1>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              register={register("email", {
                required: "Email must not be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email address is not valid"
                }
              })}
              name="email"
              infoText={errors.email?.message}
            />
            <TextField
              label="Username"
              register={register("username", {
                required: "Username must not be empty", minLength: {
                  value: 4, message: "Username is too short"
                }
              })}
              name="username"
              infoText={errors.username?.message}
            />
            <TextField
              label="Password" register={register("password", {
                required: "Password must not be empty",
                validate: {
                  hasNumber: (v) => {
                    const hasNumber = /[0-9]/.test(v);
                    if (hasNumber === false) { return "Password must contain atleast one number" }
                    return true;
                  },
                  hasUppercase: (v, values) => {
                    const hasUppercase = /[A-Z]/.test(v);
                    if (hasUppercase === false) { return "Password must contain atleast one uppercase letter" }
                    return true
                  },
                  length: (v) => {
                    if (v.length < 8 || v.length > 20) {
                      return "Password must be between 8 to 20 characters long"
                    }
                    return true;
                  },
                  excludesSpecialChars: (v) => {
                    const pattern = /^[a-zA-Z0-9]*$/;
                    if (pattern.test(v) === false) {
                      return "Password must not contain any special characters";
                    }
                    return true;
                  }
                }
              })}
              name="password"
              infoText={errors.password?.message}
            />
            <Button label={isSubmittingForm ? "Loading..." : "Signup"} isSubmit={true} stretch disabled={isSubmittingForm} />
          </form>
          <p className="text-[0.81rem] font-bold text-gray-75">Or Continue with</p>
          <Button variant="gray" label="Google" isSubmit={true} stretch disabled={isSubmittingForm}>
            <Image src={GoogleLogo} alt="google logo" />
          </Button>
          <p className="text-[0.81rem] flex items-center gap-2">
            <span>Already have an account?</span>
            <Link href="/login" className="text-primary-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
