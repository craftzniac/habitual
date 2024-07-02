import { habits } from "../data";

export default async function fetchHabit(id: string) {
	const habit = habits.find(habit => habit.id === id)
	return habit || null
}
