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

  const days: { dayOfWeek: DayOfWeek; timestamp: number }[] = [];
  // console.log(startDate.getUTCDay()); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday

  let count = 0;
  while (days.length < durationInDays) {
    const startDate = new Date(startDateString);
    const day = new Date(startDate.setUTCDate(startDate.getUTCDate() + count));
    if (isDayExcluded({ excludedDays, day }) === false) {
      days.push({
        dayOfWeek: indexToDayOfWeek(day.getUTCDay()),
        timestamp: day.getTime(),
      });
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
export function getUTCDateString(isoDate: Date): string {
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

/**
 * return a timestamp using the date-only portion of a Date object.
 * */
export function getDateOnlyTimestamp(date: Date) {
  return new Date(date.toISOString().split('T')[0]).getTime();
}

/**
 * compute whether the timestamp represents date that is in the "past", "future" or is "today"
 * */
export function getHabitDayTimestampStatus(
  dayTimestamp: number,
): 'past' | 'today' | 'future' {
  // get the timestamp of today's date, using only the date portion
  const todayDateTimestamp = getDateOnlyTimestamp(new Date());

  if (todayDateTimestamp > dayTimestamp) {
    // in the past
    return 'past';
  } else if (todayDateTimestamp < dayTimestamp) {
    // day is in the future
    return 'future';
  } else {
    // is today
    return 'today';
  }
}

// using the generatedHabitDaysTimestamp, find those habit days that have timestamps matching today or a time in the past, then exclude those that have isCompleted set to true and Count the rest
export function getRemainingDaysTimestamps(
  generatedHabitDaysTimestamp: number[],
): {
  remainingDaysTimestamps: number[];
} {
  // const pastDaysTimestamps: number[] = [];
  const remainingDaysTimestamps: number[] = [];
  generatedHabitDaysTimestamp.forEach((timestamp) => {
    const dateStatus = getHabitDayTimestampStatus(timestamp);
    switch (dateStatus) {
      case 'future':
        remainingDaysTimestamps.push(timestamp);
        break;
      case 'past':
        // pastDaysTimestamps.push(timestamp);
        break;
      default:
      // this timestamp represents today
    }
  });
  return { remainingDaysTimestamps };
}

/**
 * calculates user's consistency on a habit in percentage
 * @returns consistency value in percentage
 * */
export function calculateConsistencyInPercent({
  completedDaysCount,
  totalDaysCount,
  remainingDaysCount,
}: {
  completedDaysCount: number;
  totalDaysCount: number;
  remainingDaysCount: number;
}) {
  return Math.floor(
    (completedDaysCount / (totalDaysCount - remainingDaysCount)) * 100,
  );
}

/**
 * Check if the input text can be parsed to a valid date object
 * */
export function isValidTimestamp(stamp: number | string): boolean {
  const d = new Date(stamp);
  if (isNaN(d.getTime())) {
    return false;
  }
  return true;
}

/**
 * checks whether a timestamp belongs to a habit day in a habit's habit day list.
 * */
export async function isValidHabitDayTimestamp({
  frequency,
  timestamp,
  startDate,
  durationInDays,
}: {
  timestamp: number;
  frequency: DayOfWeek[];
  startDate: string;
  durationInDays: number;
}) {
  const datestamp = getDatestamp(timestamp);
  // GENERate habit days for this habit and check if this date matches any habit date.
  const habitDayTimestamps = generateHabitDays({
    excludedDays: getExcludedDaysFromFrequency(frequency),
    durationInDays,
    startDateString: startDate,
  });
  //2. check that the slug (which is a date string) represents a valid habit day for this habit
  const isFound = habitDayTimestamps.find((d) => {
    if (d.timestamp === datestamp) return true;
    else return false;
  });
  return isFound;
}

export function getDatestamp(timestamp: number | string) {
  const dateString = new Date(timestamp).toISOString().split('T')[0];
  return new Date(dateString).getTime();
}
