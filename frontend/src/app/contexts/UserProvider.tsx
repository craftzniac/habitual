"use client"
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextData {
  email: string;
  username: string;
  profileImage?: string;
  updateUsername: (username: string) => void;
}

const UserContext = createContext<UserContextData>({
  username: "",
  profileImage: "",
  email: "",
  updateUsername: () => { }
});

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({ value, children }: { value: { username: string, profileImage?: string, email: string }, children: ReactNode }) {
  const [userData, setUserData] = useState(value)

  function updateUsername(username: string) {
    setUserData(prev => ({ ...prev, username }))
  }
  return (
    <UserContext.Provider value={{ ...userData, updateUsername }}>
      {children}
    </UserContext.Provider>
  )
}
