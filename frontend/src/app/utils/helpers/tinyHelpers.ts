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
		status: habit.status,
		consistencyInPercent: habit.consistencyInPercent,
		createdAt: habit.createdAt,
		updatedAt: habit.updatedAt
	}
}


/**
 * return a timestamp using the date-only portion of a Date object.
 * */
export function getDateOnlyTimestamp(date: Date) {
	return new Date(date.toISOString().split("T")[0]).getTime();
}

/**
 * compute whether the timestamp represents date that is in the "past", "future" or is "today"
 * */
export function getHabitDayTimestampStatus(dayTimestamp: number): "past" | "today" | "future" {
	// get the timestamp of today's date, using only the date portion
	const todayDateTimestamp = getDateOnlyTimestamp(new Date());

	if (todayDateTimestamp > dayTimestamp) {
		// in the past
		return "past";
	} else if (todayDateTimestamp < dayTimestamp) {
		// day is in the future
		return "future";
	} else {
		// is today
		return "today";
	}

}


/**
 * @returns a habit day object whose timestamp match the provided timestamp, else undefined.
 * */
export function getHabitDaySavedDate(savedHabitDaysTimestamps: TSavedHabitDay[], timestamp: number): TSavedHabitDay | undefined {
	return savedHabitDaysTimestamps.find(hd => {
		return hd.timestamp === timestamp;
	});
}

/**
 * returns just the date portion in the form yyyy-mm-dd in UTC
 * */
export function getUTCDateString(date: Date): string {
	const isoDateString = date.toISOString();
	const parts = isoDateString.split('T');
	return parts[0];
}
