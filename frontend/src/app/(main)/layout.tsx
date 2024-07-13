import { ReactNode } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation";
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex w-full h-full">
            <Sidebar />
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
