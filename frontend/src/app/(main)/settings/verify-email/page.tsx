import { Paper_Plane_16 } from "@/app/assets/icons";
import { Verify_Email } from "@/app/assets/illustrations";
import Button from "@/app/components/form/Button";
import Image from "next/image"

export default function VerifyEmail() {
    return (
        <section className="w-full h-full flex flex-col justify-center items-center p-4 gap-4">
            <Image src={Verify_Email} alt="person holding email" />
            <p className="max-w-64 text-center">You need to verify your old email before you can change to a new one</p>
            <Button label="Send Verification Code">
                <Image src={Paper_Plane_16} alt="" />
            </Button>
        </section>
    )
}
