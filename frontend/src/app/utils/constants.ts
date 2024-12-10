import {
	House_24_Purple, House_24_Gray, Settings_24_Purple, Settings_24_Gray, Habits_24_Purple, Habits_24_Gray,
	Buddies_24_Gray,
	Buddies_24_Purple,
	House_24_Black,
	House_24_White,
	Habits_24_White,
	Habits_24_Black,
	Buddies_24_Black,
	Buddies_24_White,
	Settings_24_White,
	Settings_24_Black,
} from "@/app/assets/icons"
import { TDayOfWeek, TReminderTime } from "./types"


export const baseUrl = "http://localhost:3000"

export const navPaths = {
	OVERVIEW: "/overview",
	HABITS: {
		INDEX: "/habits",
		NEW: "/habits/new",
	},
	HABIT_BUDDIES: {
		INDEX: "/habit-buddies",
		MESSAGE_REQUESTS: "/habit-buddies/message-requests"
	},
	SETTINGS: {
		INDEX: "/settings",
		VERIFY_EMAIL: {
			INDEX: "/settings/verify-email",
			EMAIL_CODE: {
				INDEX: "/settings/verify-email/email-code",
				NEW_EMAIL: "/settings/verify-email/email-code/new-email"
			}
		}
	},
} as const

export const navItems = [
	{
		label: "Overview",
		path: navPaths.OVERVIEW,
		iconGray: House_24_Gray,
		iconPurple: House_24_Purple,
		iconWhite: House_24_White,
		iconBlack: House_24_Black,
	},
	{
		label: "Habits",
		path: navPaths.HABITS.INDEX,
		iconGray: Habits_24_Gray,
		iconPurple: Habits_24_Purple,
		iconWhite: Habits_24_White,
		iconBlack: Habits_24_Black
	},
	// {
	// 	label: "Habit Buddies",
	// 	path: navPaths.HABIT_BUDDIES.INDEX,
	// 	iconGray: Buddies_24_Gray,
	// 	iconPurple: Buddies_24_Purple,
	// 	iconWhite: Buddies_24_White,
	// 	iconBlack: Buddies_24_Black
	// },
	{
		label: "Settings",
		path: navPaths.SETTINGS.INDEX,
		iconGray: Settings_24_Gray,
		iconPurple: Settings_24_Purple,
		iconWhite: Settings_24_White,
		iconBlack: Settings_24_Black
	},
]


export const habitSegBtns = [
	{
		text: "Today",
		filter: "today"
	},
	{
		text: "On-going",
		filter: "on-going"
	},
	{
		text: "Completed",
		filter: "completed"
	},
] as const

export const reminderTimeOptions: TReminderTime[] = [
	'00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
] as const;

export const daysOfWeekOptions: {
	label: string,
	value: TDayOfWeek
}[] = [
		{ label: "Sunday", value: "sun" },
		{ label: "Monday", value: "mon" },
		{ label: "Tuesday", value: "tue" },
		{ label: "Wednesday", value: "wed" },
		{ label: "Thursday", value: "thu" },
		{ label: "Friday", value: "fri" },
		{ label: "Saturday", value: "sat" },
	]

export const daysOfWeekArray: TDayOfWeek[] = [
	'sun',
	'mon',
	'tue',
	'wed',
	'thu',
	'fri',
	'sat',
] as const;
