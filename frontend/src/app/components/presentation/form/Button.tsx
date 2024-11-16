import { MouseEvent, ReactNode } from "react"

type Props = {
    label: string,
    isSubmit?: boolean,
    variant?: ButtonVariant,
    children?: ReactNode,
    labelClassName?: string,
    stretch?: boolean,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

type ButtonVariant = "primary" | "text-btn" | "gray" | "delete"

export default function Button({ label, labelClassName, isSubmit = true, variant = "primary", children, stretch = false, onClick, disabled = false }: Props) {
    const variantStyle = getVariantSpecificStyle(variant)

    function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
        if (onClick) {
            onClick(e)
        }

    }
    return (
        <button
            disabled={disabled}
            onClick={handleOnClick}
            type={isSubmit === true ? "submit" : "button"}
            className={`rounded-full min-w-fit text-sm py-3 px-6 font-bold flex items-center justify-center gap-1  ${variantStyle} ${stretch ? "w-full" : "w-fit"} ${disabled ? "opacity-50" : "opacity-100"}`}>
            <span className="flex">
                {children}
            </span>
            <span className={labelClassName}>
                {label}
            </span>
        </ button >
    )
}

function getVariantSpecificStyle(variant: ButtonVariant): string {
    if (variant === "primary") {
        return "text-white bg-primary-500"
    }
    if (variant === "delete") {
        return "text-white bg-red"
    }
    if (variant === "text-btn") {
        return ""
    }
    return "border-[1px] border-primary-100"
}
