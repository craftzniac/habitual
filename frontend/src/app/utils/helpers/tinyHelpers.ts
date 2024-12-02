import { TDurationSelectOption } from "../types";

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

