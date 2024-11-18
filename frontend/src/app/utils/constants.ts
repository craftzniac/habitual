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
}

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
