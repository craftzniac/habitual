"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Logo } from "@/app/assets/icons";
import TextField from "@/app/components/presentation/form/TextField";
import Button from "@/app/components/presentation/form/Button";
import { TSignupFormInputs } from "@/app/utils/types";
import { signupAction } from "@/app/server-actions/signupAction";
import { useState } from "react";
import { useToast } from "@/app/components/logic/toast";
import { signIn } from "next-auth/react";
import PasswordField from "../components/presentation/PasswordField";

const defaultValues: TSignupFormInputs = {
  username: "",
  email: "",
  password: ""
}

export default function Signup() {
  const { toast } = useToast();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<TSignupFormInputs> = async (fields) => {
    setIsSubmittingForm(true);
    const res = await signupAction(fields);
    setIsSubmittingForm(false);
    if (res.success === true) {
      // log user in
      setIsSubmittingForm(true);
      const result = await signIn("credentials", {
        email: fields.email, password: fields.password, redirect: false
      })
      setIsSubmittingForm(false);
      if (!result) {
        toast("Account created but signin failed", { type: "error" });
        return;
      }

      if (result.status === 200) {
        toast("Signup successful! Logging in...");
        reset();
        router.push("/overview")
      } else {
        toast("Account created but signin failed", { type: "error" });
      }
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
            {
              // @ts-ignore
              <PasswordField register={register} errorMsg={errors.password?.message} />
            }
            <Button label={isSubmittingForm ? "Loading..." : "Signup"} isSubmit={true} stretch disabled={isSubmittingForm} />
          </form>
          {
            // <p className="text-[0.81rem] font-bold text-gray-75">Or Continue with</p>
            // <Button variant="gray" label="Google" isSubmit={true} stretch disabled={isSubmittingForm}>
            //   <Image src={GoogleLogo} alt="google logo" />
            // </Button>
          }
          <p className="text-[0.81rem] flex items-center gap-2">
            <span>Already have an account?</span>
            <Link href="/login" className="text-primary-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
