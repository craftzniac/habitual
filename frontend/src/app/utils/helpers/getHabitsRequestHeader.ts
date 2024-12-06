export function getHabitsRequestHeader(accessToken: string) {
	return {
		Authorization: `Bearer ${accessToken}`
	}
}

