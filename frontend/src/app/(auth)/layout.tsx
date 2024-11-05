import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-y-auto justify-center md:items-center">
      {children}
    </div>
  )
}
