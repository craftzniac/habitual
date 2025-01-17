// "use client"
// import { useRouter } from "next/navigation";
// import { Paper_Plane_16 } from "@/app/assets/icons";
// import { Verify_Email } from "@/app/assets/illustrations";
// import Button from "@/app/components/presentation/form/Button";
// import { navPaths } from "@/app/utils/constants";
// import Image from "next/image"
//
// export default function VerifyEmail() {
//     const router = useRouter()
//     function onSendVerificationCode() {
//         // actually send an email to the user's email inbox
//
//         router.push(navPaths.SETTINGS.VERIFY_EMAIL.EMAIL_CODE.INDEX)
//     }
//     return (
//         <section className="w-full h-full flex flex-col justify-center items-center p-4 gap-4">
//             <Image src={Verify_Email} alt="person holding email" />
//             <p className="max-w-64 text-center">You need to verify your old email before you can change to a new one</p>
//             <Button label="Send Verification Code" onClick={onSendVerificationCode}>
//                 <Image src={Paper_Plane_16} alt="" />
//             </Button>
//         </section>
//     )
// }
