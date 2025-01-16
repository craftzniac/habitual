"use client";
import { createContext, ReactNode, useState, useContext } from "react"

type TContextData = {
  isAccountDeleteDialogOpen: boolean,
  closeAccountDeleteDialog: () => void,
  openAccountDeleteDialog: () => void,
}

const initialContextValue: TContextData = {
  isAccountDeleteDialogOpen: false,
  closeAccountDeleteDialog: () => { },
  openAccountDeleteDialog: () => { },
}

export function useAccountDeleteContext() {
  return useContext(AccountDeleteContext);
}

const AccountDeleteContext = createContext<TContextData>(initialContextValue);

export default function AccountDeleteProvider({ children }: { children: ReactNode }) {
  const [isAccountDeleteDialogOpen, setIsAccountDeleteDialogOpen] = useState(initialContextValue.isAccountDeleteDialogOpen);

  return (
    <AccountDeleteContext.Provider value={{
      isAccountDeleteDialogOpen,
      closeAccountDeleteDialog: () => setIsAccountDeleteDialogOpen(false),
      openAccountDeleteDialog: () => setIsAccountDeleteDialogOpen(true),
    }}>
      {children}
    </AccountDeleteContext.Provider>
  )
}
