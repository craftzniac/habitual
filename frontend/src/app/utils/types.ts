import { UseFormRegister } from "react-hook-form";

export type APIErrorResponse = {
	success: false,
	message: string
}


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

export type TReminderTime =
	| '00:00'
	| '00:30'
	| '01:00'
	| '01:30'
	| '02:00'
	| '02:30'
	| '03:00'
	| '03:30'
	| '04:00'
	| '04:30'
	| '05:00'
	| '05:30'
	| '06:00'
	| '06:30'
	| '07:00'
	| '07:30'
	| '08:00'
	| '08:30'
	| '09:00'
	| '09:30'
	| '10:00'
	| '10:30'
	| '11:00'
	| '11:30'
	| '12:00'
	| '12:30'
	| '13:00'
	| '13:30'
	| '14:00'
	| '14:30'
	| '15:00'
	| '15:30'
	| '16:00'
	| '16:30'
	| '17:00'
	| '17:30'
	| '18:00'
	| '18:30'
	| '19:00'
	| '19:30'
	| '20:00'
	| '20:30'
	| '21:00'
	| '21:30'
	| '22:00'
	| '22:30'
	| '23:00'
	| '23:30';


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

export type THabit = {
	id: string;
	userId: string;
	name: string;
	description?: string;
	startDate: string;
	durationInDays: number;
	frequency?: Set<TDayOfWeek>;
	reminders?: Set<TReminderTime>;
	status: "on-going" | "completed",
	consistencyInPercent: number,
	createdAt: string;
	updatedAt: string;
};


export type TSavedHabitDay = {
	id: string;
	habitId: string;
	originalStartDate: Date;
	date: string;
	isCompleted: boolean;
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

export type TDayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type TDurationSelectOption = {
	label: string,
	value: number
}
