import { useEffect, useRef, useState } from "react"
import Image from "next/image";
import { RedCircleError, GreenCircleCheck, X_16 } from "@/app/assets/icons"

export type ToastMessage = {
  id: string
  name: string,
  type: "success" | "error"
}

export function Toast({ toast, removeThisToast }: { toast: ToastMessage, removeThisToast: (toastId: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isAlive, setIsAlive] = useState(true);
  const timerDuration = 3000 // 3 seconds;

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isAlive) {
      timerId = setTimeout(() => {
        setIsAlive(false);
      }, timerDuration)
    } else {
      removeThisToast(toast.id);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [isAlive, removeThisToast, toast.id])


  const toastIcon = toast.type === "success" ? GreenCircleCheck : RedCircleError;

  return (
    <div ref={ref} className="mt-2 rounded-lg bg-white shadow px-2 py-3 flex gap-2 items-center w-full max-w-[25rem]">
      <Image src={toastIcon} alt={toast.type === "success" ? "green check mark" : "red exclamation mark"} className="" />
      <p className="w-full">{toast.name}</p>
      <button type="button" className="opacity-50 hover:opacity-100 transition p-1" onClick={() => {
        setIsAlive(false);
      }}>
        <Image src={X_16} alt="x mark" className="w-4 h-4" />
      </button>
    </div>
  )
} 
