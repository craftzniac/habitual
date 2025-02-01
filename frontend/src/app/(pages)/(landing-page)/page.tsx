import Image from "next/image";
import { Logo } from "@/app/assets/icons";
import Link from "next/link";
import { Hero_Pic } from "@/app/assets/images";
import { Auth } from "@/app/services/authService";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let user = null;
  if (session) {
    let res = await Auth.getUserData({ accessToken: session.user.accessToken });
    if (res.success) {
      user = { ...res };
    }
  }
  return (
    <div className="flex flex-col w-full">
      <header className="w-full flex items-center gap-4 justify-between p-4">
        <div className="flex items-center gap-4 justify-center">
          <Image src={Logo} className="min-w-6 min-h-6" alt="logo" />
          <p className="hidden 3xl:block text-2xl font-bold gap-4 w-full">Habitual</p>
        </div>
        {
          user ? (
            <Link href="/overview" className="w-8 h-8  rounded-full relative overflow-hidden flex justify-center items-center group bg-primary-900/20 text-base font-bold">
              {user.username[0].toUpperCase()}
            </Link>
          ) : (
            <div className="flex items-center text-sm">
              <Link href="/login" className="font-bold text-primary-500 px-3 py-2 hover:underline">Login</Link>
              <Link href="/signup" className="font-bold text-primary-500 px-3 py-2 hover:underline">Signup</Link>
            </div>
          )
        }
      </header >
      <main className="flex py-4 justify-center lg:items-center lg:h-full">
        <div className="grid grid-cols-1 p-4 lg:p-8 2xl:p-16 gap-16 lg:grid-cols-2 max-w-[100rem]">
          <div className="flex flex-col gap-4 items-center lg:items-start lg:w-full 2xl:gap-8">
            <h1 className="font-bold text-4xl lg:text-5xl 2xl:text-7xl lg:leading-[120%] text-center lg:text-start"><span className="bg-primary-500/10">Make habits stick</span> by tracking them</h1>
            <p className="text-base lg:text-lg 2xl:text-xl text-gray-75 text-center lg:text-start max-w-[30rem]">Track habits for a specific duration, add a journal entry for each day and keep an eye on your consistency level</p>
            <Link href={user ? "/overview" : "/login"} className="px-6 lg:px-8 lg:py-4 py-3 font-bold text-sm lg:text-base rounded-full bg-primary-500 transition-colors duration-200 hover:bg-primary-700 text-white">{user ? "Open Dashboard" : "Start Tracking Habits"}</Link>
          </div>
          <div className="flex w-full justify-center">
            <Image src={Hero_Pic} alt="" className="w-full max-w-[40rem] lg:max-w-[100rem]" />
          </div>
        </div>
      </main>
    </div >
  )
}
