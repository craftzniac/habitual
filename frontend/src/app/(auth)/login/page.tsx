import Image from "next/image";
import Logo from "@/app/assets/logo.svg"
import Link from "next/link"
import TextField from "@/app/components/form/TextField";
import Button from "@/app/components/form/Button";
import { GoogleLogo } from "@/app/assets/icons";

export default function Login() {
    return (
        <div className="w-full h-full flex p-4">
            <main className="w-full h-full flex flex-col items-center gap-4">
                <Image src={Logo} alt="logo" />
                <div className="flex flex-col w-full h-full items-center gap-4">
                    <h1 className="font-bold text-lg">Welcome Back!</h1>
                    <form className="w-full flex flex-col gap-4">
                        <TextField label="Email" name="email" />
                        <TextField label="Password" name="password" />
                        <Button label="Login" />
                    </form>
                    <p className="text-[0.81rem] font-bold text-gray-75">Or Continue with</p>
                    <Button variant="gray" label="Google">
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
