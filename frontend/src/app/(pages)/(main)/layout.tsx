import { ReactNode } from "react";
import Sidebar from "./components/presentation/Sidebar";
import BottomNavigation from "./components/presentation/BottomNavigation";
import { getSessionOrSignout } from "@/app/api/auth/[...nextauth]/getSessionOrSignout";
import UserProvider from "@/app/contexts/UserProvider";
import AccountDeleteProvider from "@/app/contexts/AccountDeleteProvider";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSessionOrSignout();
    const user = session.user;
    return (
        <UserProvider value={{ username: user.username, profileImage: user.profileImage }}>
            <AccountDeleteProvider>
                <div className="flex w-full h-full">
                    <Sidebar />
                    <div className="flex relative flex-col w-full h-full justify-end">
                        <div className="flex flex-col h-full min-h-0 lg:h-full w-full">
                            {children}
                        </div>
                        <BottomNavigation />
                    </div>
                </div>
            </AccountDeleteProvider>
        </UserProvider>
    )
}
