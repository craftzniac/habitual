import { ReactNode } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation";
import { getSessionOrSignout } from "@/app/(api)/api/auth/[...nextauth]/getSessionOrSignout";
import { User1 } from "@/app/assets/images";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSessionOrSignout();
    const user = { username: "craftzniac", profileImage: User1 }
    return (
        <div className="flex w-full h-full">
            <Sidebar user={user} />
            <section className="flex flex-col w-full h-full">
                <Header />
                <main className="flex w-full h-full overflow-hidden">
                    {children}
                </main>
                <BottomNavigation />
            </section>
        </div>
    )
}
