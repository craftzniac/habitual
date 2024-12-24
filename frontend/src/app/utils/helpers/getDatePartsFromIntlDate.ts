export default function getDatePartsFromIntlDate(dateString: string) {
	const monthDayFormatter = new Intl.DateTimeFormat(undefined, {
		day: "2-digit",
	})
	const monthFormatter = new Intl.DateTimeFormat(undefined, {
		month: "short",
	})
	const weekDayFormatter = new Intl.DateTimeFormat(undefined, {
		weekday: "short",
	})
	const monthDay = monthDayFormatter.format(new Date(dateString));
	const month = monthFormatter.format(new Date(dateString));
	const weekday = weekDayFormatter.format(new Date(dateString));

	return { monthDay, month, weekday }
}
