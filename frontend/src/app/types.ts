export type Habit = {
	id: string,
	title: string,
	description: string,
	isCompleted: boolean,
	stats: {
		numberOfHabitDays: number,
		numberOfFulfilledHabitDays: number,
		numberOfMissedDays: number,
		numberOfRemainingDays: number
	}
}
