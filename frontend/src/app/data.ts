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
import { Habit } from "./types"

export const navPaths = {
	OVERVIEW: "/overview",
	HABITS: "/habits",
	HABIT_BUDDIES: "/habit-buddies",
	SETTINGS: "/settings"
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
		path: navPaths.HABITS,
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
		path: navPaths.SETTINGS,
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
