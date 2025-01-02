export default function getDatePartsFromIntlDate(timestamp: number) {
	const monthDayFormatter = new Intl.DateTimeFormat(undefined, {
		day: "2-digit",
	})
	const monthFormatter = new Intl.DateTimeFormat(undefined, {
		month: "short",
	})
	const weekDayFormatter = new Intl.DateTimeFormat(undefined, {
		weekday: "short",
	})
	const monthDay = monthDayFormatter.format(new Date(timestamp));
	const month = monthFormatter.format(new Date(timestamp));
	const weekday = weekDayFormatter.format(new Date(timestamp));

	return { monthDay, month, weekday }
}
