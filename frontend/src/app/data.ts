import {
	House_24_Active,
	House_24,
	Habits_24_Active,
	Habits_24,
	Buddies_24_Active,
	Buddies_24,
	Settings_24_Active,
	Settings_24
} from "@/app/assets/icons"
import { Day, Habit } from "./types"

export const navPaths = {
	OVERVIEW: "/overview",
	HABITS: {
		INDEX: "/habits",
		NEW: "/habits/new",
	},
	HABIT_BUDDIES: "/habit-buddies",
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
		icon: House_24,
		activeIcon: House_24_Active
	},
	{
		label: "Habits",
		path: navPaths.HABITS.INDEX,
		icon: Habits_24,
		activeIcon: Habits_24_Active
	},
	{
		label: "Habit Buddies",
		path: navPaths.HABIT_BUDDIES,
		icon: Buddies_24,
		activeIcon: Buddies_24_Active
	},
	{
		label: "Settings",
		path: navPaths.SETTINGS.INDEX,
		icon: Settings_24,
		activeIcon: Settings_24_Active
	},
]

export const habits: Habit[] = [
	{
		title: "Read a book",
		isCompleted: false,
		stats: {
			numberOfHabitDays: 20,
			numberOfFulfilledHabitDays: 7,
			numberOfMissedDays: 3,
			numberOfRemainingDays: 10
		},
		id: "wlwkwioijkasdfasi",
		description: "Read Cal Newport's Deep Work, for 30minutes after work"
	},
	{
		title: "Do morning workout",
		isCompleted: false,
		stats: {
			numberOfHabitDays: 15,
			numberOfFulfilledHabitDays: 1,
			numberOfMissedDays: 2,
			numberOfRemainingDays: 12
		},
		id: "ksdflafo2ioiewjwef",
		description: "I want to workout everymorning. Workout include 500 reps of jump rope"
	},
]


export const completedHabits: Habit[] = [
	{
		title: "Pick the flowers",
		isCompleted: true,
		stats: {
			numberOfHabitDays: 10,
			numberOfFulfilledHabitDays: 7,
			numberOfMissedDays: 3,
			numberOfRemainingDays: 0
		},
		id: "kasdnfiojwkjefwjf",
		description: "Exactly what it says. I&apos;m going to pick the flowers for 10days, everyday"
	},
	{
		title: "Observe morning routine",
		isCompleted: true,
		stats: {
			numberOfHabitDays: 21,
			numberOfFulfilledHabitDays: 15,
			numberOfMissedDays: 6,
			numberOfRemainingDays: 0
		},
		id: "ksdflafo2ioiewjwef",
		description: "I want to form the habit of observing my morning routine, so I'll do just that for 21 days"
	},
]


export const habitSegBtns = [
	{
		text: "Today",
		filter: "today"
	},
	{
		text: "In-Progress",
		filter: "in-progress"
	},
	{
		text: "Completed",
		filter: "completed"
	},
	{
		text: "All",
		filter: "all"
	},
]

export const habitDays = [
	{
		id: "dksi2k2l2i2k2",
		date: "2024-06-02T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "mm22l22i2i2k2",
		date: "2024-06-03T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "2m2m2l222lk200",
		date: "2024-06-04T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "22o02092o2i22kj",
		date: "2024-06-06T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "asdmo2i2022i2kjkl01",
		date: "2024-06-07T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "28202lkj11k1jk1",
		date: "2024-06-08T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "2kqqioquiquazzxd",
		date: "2024-06-09T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "2973481181kjd",
		date: "2024-06-10T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "m22820nnnmxxxbbbv",
		date: "2024-06-11T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "asdi2292okljsdkf",
		date: "2024-06-12T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "02202920929220",
		date: "2024-06-13T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "1000099929292",
		date: "2024-06-14T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "alkfdalkfllsdkjf",
		date: "2024-06-15T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "9888766262hsdjaff",
		date: "2024-06-16T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "117919187198u4j",
		date: "2024-06-17T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "1n1nm1uklj22j",
		date: "2024-06-19T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "mnwwwgwwnbb22kzaaa",
		date: "2024-06-20T20:29:14.817Z",
		status: "missed"
	},
	{
		id: "2229892298k2jk2jj2",
		date: "2024-06-21T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "2222kj2k2j2222",
		date: "2024-06-22T21:58:14.817Z",
		status: "fulfilled"
	},
	{
		id: "dlkjlkafi2kj2k2",
		date: "2024-06-23T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "j43ij4i33j3kn3i4ji3",
		date: "2024-06-24T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "alwpwowwjwwiknnneke",
		date: "2024-06-25T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "2n2k2990il2i209urew",
		date: "2024-06-26T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "lliqlqiioji1o1ijoijdn",
		date: "2024-06-27T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "w02i2l2j29ijowwnwwj",
		date: "2024-06-28T20:29:14.817Z",
		status: "fulfilled"
	},
	{
		id: "1101019j1k1lk1j",
		date: "2024-06-29T20:29:14.817Z",
		status: "remaining"
	},
	{
		id: "dfjkadlkjaso2kjijdd",
		date: "2024-06-30T20:29:14.817Z",
		status: "remaining"
	},
	{
		id: "ffakdfiajnwkwnei",
		date: "2024-07-01T20:29:14.817Z",
		status: "remaining"
	},
	{
		id: "55inskdfnaindjdj",
		date: "2024-07-02T20:29:14.817Z",
		status: "remaining"
	},
	{
		id: "33knasininsoikna",
		date: "2024-07-04T14:09:14.817Z",
		status: "remaining"
	},
] as Day[]

export const reminders = [
	{
		id: "askdfnasoikwn",
		habitId: "asd2i2kj2k2j",
		timestamp: "06:00 am",
		timezone: "Lagos/Nigeria"
	},
	{
		id: "kwnkenafiafdaf",
		habitId: "asd2i2kj2k2j",
		timestamp: "06:15 am",
		timezone: "Lagos/Nigeria"
	},
	{
		id: "ask82upoidj34oww",
		habitId: "asd2i2kj2k2j",
		timestamp: "10:00 pm",
		timezone: "Lagos/Nigeria"
	},
]
