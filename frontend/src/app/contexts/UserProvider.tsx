"use client"
import { createContext, ReactNode, useContext, useState } from "react";
interface UserData {
  username: string;
  profileImage?: string
}
const UserContext = createContext<UserData>({ username: "", profileImage: "" });

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({ value, children }: { value: { username: string, profileImage?: string }, children: ReactNode }) {
  const [userData] = useState(value)
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}
