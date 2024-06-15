import { useEffect, useState } from "react"

export function useIsDesktop() {
	const mdScreen = 768;
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= mdScreen)
	useEffect(() => {
		function handleResize() {
			setIsDesktop(window.innerWidth >= mdScreen)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return {
		isDesktop
	}
}
