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

export type Habit = {
	id: string,
	title: string,
	description: string,
	isCompleted: boolean,
	stats: HabitStats
}

export type SignupFormInputs = {
	email: string;
	username: string;
	password: string
}
