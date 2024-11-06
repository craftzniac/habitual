"use client";
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { Toast, type ToastMessage } from "./Toast";

const ToastContext = createContext<{
  messages: ToastMessage[],
  setMessages: Dispatch<SetStateAction<ToastMessage[]>>
} | null>(null);

function generateId() {
  const charss = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
  const length = 24
  let id = ""
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charss.length)
    id += charss[randIndex]
  }
  return id
}

export function useToast() {
  const contextData = useContext(ToastContext);

  function toast(message: string, options: { type?: "success" | "error" } = {}) {
    if (!options?.type) { options.type = "success"; }
    const type = options.type

    const id = generateId();
    const newToast = { id, type, name: message };
    if (contextData) {
      contextData?.setMessages(prev => {
        return [newToast, ...prev]
      })
    }
  }

  return { toast };
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((toastId: string) => {
    const filteredMessages = messages.filter(toast => toast.id !== toastId);
    setMessages([...filteredMessages]);
  }, [messages])

  return (
    <ToastContext.Provider value={{ messages, setMessages }}>
      <div className="fixed top-0 left-0 right-0 w-fit justify-self-center">
        {
          messages.map(toast => <Toast key={toast.id} removeThisToast={removeToast} toast={toast} />)
        }
      </div>
      {children}
    </ToastContext.Provider>
  )
}
