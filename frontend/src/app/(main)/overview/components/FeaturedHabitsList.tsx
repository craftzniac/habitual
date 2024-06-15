import HabitCard from "@/app/(main)/components/HabitCard"
import Image from "next/image";
import { Habit } from "@/app/types"
import Link from "next/link"
import { Angle_Right_16 as AngleRight } from "@/app/assets/icons"

type Props = {
    title: string,
    habits: Habit[],
    viewAllLink?: string
}

export default function FeaturedHabitsList({
    title,
    habits,
    viewAllLink
}: Props) {
    return (
        <section className="flex flex-col gap-8 w-full h-fit p-4">
            <div className="flex items-center">
                <h3 className="font-bold text-lg w-full">{title}</h3>
                {
                    viewAllLink && (
                        <Link href={viewAllLink} className="flex items-center gap-1 min-w-fit">
                            <span className="text-sm font-bold text-primary-500">View All</span>
                            <Image src={AngleRight} alt="" />
                        </Link>
                    )
                }
            </div>
            <ul className="flex flex-col gap-4 w-full h-full">
                {
                    habits.map(habit => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                        />
                    ))
                }
            </ul>
        </section>
    )
}

