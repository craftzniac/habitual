import { ReactNode } from "react";
import Sidebar from "./components/presentation/Sidebar";
import BottomNavigation from "./components/presentation/BottomNavigation";
import { getSessionOrSignout } from "@/app/api/auth/[...nextauth]/getSessionOrSignout";
import { User1 } from "@/app/assets/images";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSessionOrSignout();
    const user = { username: "craftzniac", profileImage: User1 }
    return (
        <div className="flex w-full h-full">
            <Sidebar user={user} />
            <div className="flex flex-col w-full h-full justify-end">
                {/* NOTE: This feels like a weird hack to get the height to behave as expected but it works, so...idk*/}
                <div className="flex flex-col h-[calc(100%-3.5rem)] lg:h-full w-full">
                    {children}
                </div>
                <BottomNavigation />
            </div>
        </div>
    )
}
