export default function getDatePartsFromIntlDate(dateString: string) {
	const intlDate = new Intl.DateTimeFormat(undefined, {
		day: "2-digit",
		month: "short",
		weekday: "short",
	})
	const date = intlDate.formatToParts(new Date(dateString))
	let monthDay = "", month = "", weekday = ""

	for (const entry of date) {
		switch (entry.type) {
			case "weekday":
				weekday = entry.value
				break;
			case "month":
				month = entry.value
				break;
			case "day":
				monthDay = entry.value
				break;
			default:
			// just ignore it. Don't do anything and don't throw an error
		}
	}
	return { monthDay, month, weekday }
}
