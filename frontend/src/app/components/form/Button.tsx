import { ReactNode } from "react"

type Props = {
    label: string,
    isSubmit?: boolean,
    variant?: ButtonVariant,
    children?: ReactNode,
    labelClassName?: string
}

type ButtonVariant = "primary" | "text-btn" | "gray"

export default function Button({ label, labelClassName, isSubmit = true, variant = "primary", children }: Props) {
    const variantStyle = getVariantSpecificStyle(variant)

    return (
        <button
            type={isSubmit === true ? "submit" : "button"}
            className={`rounded-full w-full text-[0.81rem] p-3 font-bold flex items-center justify-center gap-1  ${variantStyle}`}>
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
    if (variant === "text-btn") {
        return ""
    }
    return "border-[1px] border-primary-100"
}
