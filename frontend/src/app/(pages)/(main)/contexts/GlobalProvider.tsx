"use client";
import { THabit, TSavedHabitDay } from "@/app/utils/types";
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/app/components/logic/toast";

type TGlobalData = {
    habitDays: TSavedHabitDay[],
    habit: THabit,
    refreshHabitDays: () => Promise<void>,
    isHabitDeleteDialogOpen: boolean,
    closeHabitDeleteDialog: () => void,
    openHabitDeleteDialog: () => void,
}


const initialContextValue: TGlobalData = {
    habitDays: [],
    habit: { id: "", name: "", status: "on-going", userId: "", createdAt: "", startDate: "", updatedAt: "", frequency: new Set(), reminders: new Set(), description: "", durationInDays: 0, consistencyInPercent: 0 },
    refreshHabitDays: async () => { },
    isHabitDeleteDialogOpen: false,
    closeHabitDeleteDialog: () => { },
    openHabitDeleteDialog: () => { },
}

const GlobalContext = React.createContext<TGlobalData>(initialContextValue);

export function useGlobalContext() {
    return React.useContext(GlobalContext);
}

export default function GlobalProvider({ v, children, habitId }: {
    v: {
        habit: TGlobalData["habit"],
        habitDays: TGlobalData["habitDays"]
    },
    habitId: string,
    children: ReactNode
}) {
    const [habit, setHabit] = useState(v.habit);
    const [habitDays, setHabitDays] = useState(v.habitDays);
    const { toast } = useToast();
    const [isHabitDeleteDialogOpen, setIsHabitDeleteDialogOpen] = useState(false);

    async function refreshHabitDays() {
        try {
            const { data } = await axios.get(`/api/habit-days/${habitId}`);
            setHabit(prev => ({ ...prev, consistencyInPercent: data.data.consistencyInPercent }))
            setHabitDays(data.data.habitDays);
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                toast((error.response.data as any).message);
            } else {
                toast("Couldn't complete request", { type: "error" });
            }
        }
    }

    return (
        <GlobalContext.Provider value={{
            refreshHabitDays,
            habit,
            habitDays,
            closeHabitDeleteDialog: () => setIsHabitDeleteDialogOpen(false),
            openHabitDeleteDialog: () => setIsHabitDeleteDialogOpen(true),
            isHabitDeleteDialogOpen,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
