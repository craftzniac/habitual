export type HabitReminder = {
	id: string,
	habitId: string,
	timestamp: string,
	timezone: string
}

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
