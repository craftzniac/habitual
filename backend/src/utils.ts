import { daysOfWeek } from './constants';
import { DayOfWeek } from './types';

// a function to generate an id
export function generateId() {
  const charss =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
  const length = 24;
  let id = '';
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charss.length);
    id += charss[randIndex];
  }
  return id;
}

// NOTE:  these functions compute date using UTC and not the client's specific timezone!

const dow: DayOfWeek[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
] as const;

function indexToDayOfWeek(index: number): DayOfWeek {
  if (index < 0 || index > 6) {
    throw new Error('day of week index must be between 0  and 6');
  }
  return dow[index];
}

export function generateHabitDays({
  startDateString,
  durationInDays,
  excludedDays,
}: {
  startDateString: string;
  durationInDays: number;
  excludedDays: DayOfWeek[];
}) {
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

  const days: { dayOfWeek: DayOfWeek; date: Date }[] = [];
  // console.log(startDate.getUTCDay()); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday

  let count = 0;
  while (days.length < durationInDays) {
    const startDate = new Date(startDateString);
    const day = new Date(startDate.setUTCDate(startDate.getUTCDate() + count));
    if (isDayExcluded({ excludedDays, day }) === false) {
      days.push({ dayOfWeek: indexToDayOfWeek(day.getUTCDay()), date: day });
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
  excludedDays: DayOfWeek[];
  day: DayOfWeek | Date;
}): boolean {
  let dayyy: DayOfWeek;
  if (day instanceof Date) {
    dayyy = indexToDayOfWeek(day.getUTCDay());
  } else {
    dayyy = day;
  }
  return !!excludedDays.find((d) => d === dayyy);
}

/**
 * returns just the date portion in the form yyyy-mm-dd from an ISO date string
 * */
export function getDateString(isoDate: Date): string {
  const isoDateString = isoDate.toISOString();
  const parts = isoDateString.split('T');
  return parts[0];
}

/**
 * gets an array of excluded days of the week from the habit's frequency array
 * */
export function getExcludedDaysFromFrequency(frequency: DayOfWeek[]) {
  const dOfWeek = [...daysOfWeek];

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

/**
 * validate to make sure that userValues is a subset of defaultValues, if userValues is provided at all.
 * */
export function validateFiniteStringArray<T extends string>({
  userValues,
  defaultValues,
}: {
  userValues: string[];
  defaultValues: T[];
}) {
  // allow for empty [] values as frequency or reminders isn't required
  if (!userValues) {
    return true;
  }

  if (Array.isArray(userValues) === false) {
    return false;
  }

  for (const val of userValues) {
    // check if the current value is malformed and therefore isn't in the day of the week array.
    if (defaultValues.includes(val as T) === false) {
      return false;
    }
  }

  return true;
}
