"use client"
import { useEffect, useState } from "react"

export function useIsDesktop() {
	const mdScreen = 928;
	const [isDesktop, setIsDesktop] = useState<boolean | undefined>();
	useEffect(() => {
		if (window) {
			setIsDesktop(
				window.innerWidth >= mdScreen
			);
		}

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
