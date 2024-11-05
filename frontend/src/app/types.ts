import { FieldValues, UseFormRegister } from "react-hook-form";
import { reminderTimeOptions } from "./data";

export type User = {
	id: string,
	email: string,
	createdAt: string,
}

export type HabitReminder = {
	id: string,
	habitId: string,
	timestamp: ReminderTime,
	timezone: string
}

export type ReminderTime = typeof reminderTimeOptions[number];

export type HabitStats = {
	numberOfHabitDays: number,
	numberOfFulfilledHabitDays: number,
	numberOfMissedDays: number,
	numberOfRemainingDays: number
}

export type Day = {
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

export type Habit = {
	id: string;
	userId: string;
	name: string;
	description: string;
	startDate: Date;
	durationInDays: number;
	createdAt: string;
	updatedAt: string;
};



export type SignupFormInputs = {
	email: string;
	username: string;
	password: string
}

export type LoginFormInputs = Omit<SignupFormInputs, "username">

export type LoginPageProps = {
	register: UseFormRegister<SignupFormInputs | LoginFormInputs>,
	errorMsg?: string
}
