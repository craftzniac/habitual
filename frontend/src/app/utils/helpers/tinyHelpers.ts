import { TDayOfWeek, TDurationSelectOption, THabit, TReminderTime, TSavedHabitDay } from "../types";

/**
 * checks if the entered value for durationInDays is valid. 
 *
 * @returns {number | string} the number if it is between 1 and 100 both inclusive, else an error message 
 * */
export function isDurationValid(value?: string | number): number | string {
	if (!value) {
		return "Invalid input. Enter a valid number"
	}
	// reject negative values
	let val: number;
	try {
		val = parseInt("" + value);
	} catch (err) {
		return "Invalid input. Enter a valid number"
	}

	if (val <= 0 || val > 100) {
		return "Values must be between 1 and 100"
	}
	return val;
}



export function capitalizeEachWord(text: string) {
	if (text.trim() === "") {
		return "";
	}
	const words = text.split(" ");
	const newWords = [];
	for (let word of words) {
		const firstLetter = word.split("")[0];
		const newWord = firstLetter.toUpperCase() + word.slice(1);
		newWords.push(newWord);
	}
	return newWords.join(" ");
}


export function generateId() {
	const charss = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
	const length = 24
	let id = ""
	for (let i = 0; i < length; i++) {
		const randIndex = Math.floor(Math.random() * charss.length)
		id += charss[randIndex]
	}
	return id
}


export function createCustomDurationOption(durationInDays: number): TDurationSelectOption {
	return {
		label: `custom - ${durationInDays} days`,
		value: durationInDays
	}
}


/**
 * Transform the frequency and reminders array of the habit json object from the response into Sets
*/
export function transformHabit(habit: any): THabit {
	const frequency = new Set<TDayOfWeek>(habit.frequency);
	const reminders = new Set<TReminderTime>(habit.reminders);
	return {
		id: habit.id,
		userId: habit.userId,
		name: habit.name,
		description: habit.description,
		startDate: habit.startDate,
		durationInDays: habit.durationInDays,
		frequency,
		reminders,
		createdAt: habit.createdAt,
		updatedAt: habit.updatedAt
	}
}


/**
 * compute whether the date is in the "past", "future" or is "today"
 * */
export function getHabitDayDateStatus(day: string): "past" | "today" | "future" {
	// create new date object using only the date portion, no time.
	const todayDate = new Date(new Date().toISOString().split("T")[0]);
	const dayDate = new Date(new Date(day).toISOString().split("T")[0]);

	if (todayDate.getTime() > dayDate.getTime()) {
		// in the past
		return "past";
	} else if (todayDate.getTime() < dayDate.getTime()) {
		// day is in the future
		return "future";
	} else {
		// is today
		return "today";
	}

}


/**
 * tries to find the habit day data for the current iso date from the list of savedhabitday objects
 * @returns a habit day object if a match was found, else undefined.
 * */
export function getHabitDaySavedDate(savedHabitDays: TSavedHabitDay[], isoDate: string): TSavedHabitDay | undefined {
	return savedHabitDays.find(hd => {
		const hdD = hd.date.split("T")[0];
		const dateD = isoDate.split("T")[0];
		return hdD === dateD;
	});
}


