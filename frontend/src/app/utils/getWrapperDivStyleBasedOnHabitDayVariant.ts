import { Day } from "../types"

export default function getWrapperDivStyleBasedOnVariant(variant: Day["status"], borderSize: "large" | "small" = "large") {
	if (variant === "fulfilled") {
		return `bg-primary-500 text-white`
	}

	if (variant === "missed") {
		return `${borderSize === "large" ? "border-2" : borderSize === "small" ? "border-[1px]" : ""} border-primary-500 text-primary-500`
	}

	return `${borderSize === "large" ? "border-2" : borderSize === "small" ? "border-[1px]" : ""} border-primary-500/40 text-primary-500/40`
}
