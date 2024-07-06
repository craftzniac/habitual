export default function getDatePartsFromIntlDate(dateString: string) {
	const intlDate = new Intl.DateTimeFormat("us-US", {
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
				console.log("probably just a literal");
		}
	}
	return { monthDay, month, weekday }
}
