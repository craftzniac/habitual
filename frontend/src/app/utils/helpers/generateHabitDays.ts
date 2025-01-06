import { daysOfWeekArray, daysOfWeekOptions } from "../constants";
import { TDayOfWeek } from "../types";

/**
 * @returns {string[]} an array of ISO date strings matching the habit days
 * */
export function generateHabitDays({
	startDateString,
	durationInDays,
	frequency,
}: {
	startDateString: string;
	durationInDays: number;
	frequency: TDayOfWeek[];
}): number[] {

	const excludedDays = getExcludedDaysFromFrequency(frequency);

	// just return empty array if all days of the week are excluded.
	if (
		isDayExcluded({ excludedDays, day: 'sun' }) &&
		isDayExcluded({ excludedDays, day: 'mon' }) &&
		isDayExcluded({ excludedDays, day: 'tue' }) &&
		isDayExcluded({ excludedDays, day: 'wed' }) &&
		isDayExcluded({ excludedDays, day: 'thu' }) &&
		isDayExcluded({ excludedDays, day: 'fri' }) &&
		isDayExcluded({ excludedDays, day: 'sat' })
	) {
		return [];
	}

	const days: number[] = [];
	// console.log(startDate.getUTCDay()); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday

	let count = 0;
	while (days.length < durationInDays) {
		const startDate = new Date(startDateString);
		const day = new Date(startDate.setUTCDate(startDate.getUTCDate() + count));
		if (isDayExcluded({ excludedDays, day }) === false) {
			days.push(day.getTime());
		}
		count++;
	}

	return days;
}


/**
 * check if a particular day of the week is excluded
 * */
function isDayExcluded({
	excludedDays,
	day,
}: {
	excludedDays: TDayOfWeek[];
	day: TDayOfWeek | Date;
}): boolean {
	let dayyy: TDayOfWeek;
	if (day instanceof Date) {
		dayyy = indexToDayOfWeek(day.getUTCDay());
	} else {
		dayyy = day;
	}
	return !!excludedDays.find((d) => d === dayyy);
}

function indexToDayOfWeek(index: number): TDayOfWeek {
	if (index < 0 || index > 6) {
		throw new Error('day of week index must be between 0  and 6');
	}
	return daysOfWeekArray[index];
}


/**
 * gets an array of excluded days of the week from the habit's frequency array
 * */
export function getExcludedDaysFromFrequency(frequency: TDayOfWeek[]) {
	const dOfWeek = [...daysOfWeekArray];

	const excluded = dOfWeek.filter((day) => {
		// filter out days that also appear in the frequency array
		const inFreqArray = frequency.find((d) => d === day);
		if (inFreqArray) {
			return false;
		}
		return true;
	});

	return excluded;
}
