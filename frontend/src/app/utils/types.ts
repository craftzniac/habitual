import { UseFormRegister } from "react-hook-form";
import { reminderTimeOptions } from "./testData";

export type TUser = {
	id: string,
	email: string,
	createdAt: string,
}

export type THabitReminder = {
	id: string,
	habitId: string,
	timestamp: TReminderTime,
	timezone: string
}

export type TReminderTime = typeof reminderTimeOptions[number];

export type THabitStats = {
	numberOfHabitDays: number,
	numberOfFulfilledHabitDays: number,
	numberOfMissedDays: number,
	numberOfRemainingDays: number
}

export type TDay = {
	id: string,
	date: string,
	status: "fulfilled" | "missed" | "remaining"
}

// ;;Old;;
// export type Habit = {
// 	id: string,
// 	title: string,
// 	description: string,
// 	isCompleted: boolean,
// 	stats: HabitStats
// }

export type THabit = {
	id: string;
	userId: string;
	name: string;
	description: string;
	startDate: Date;
	durationInDays: number;
	createdAt: string;
	updatedAt: string;
};



export type TSignupFormInputs = {
	email: string;
	username: string;
	password: string
}

export type TLoginFormInputs = Omit<TSignupFormInputs, "username">

export type TLoginPageProps = {
	register: UseFormRegister<TSignupFormInputs | TLoginFormInputs>,
	errorMsg?: string
}


export type THabitFilter = "today" | "on-going" | "completed"
