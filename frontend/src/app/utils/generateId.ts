export function generateId() {
	const charss = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
	const length = 24
	let id = ""
	for (let i = 0; i < length; i++) {
		const randIndex = Math.floor(Math.random() * charss.length)
		id += charss[randIndex]
	}
	return id
}
