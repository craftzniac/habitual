type Props = {
    params: {
        id: string
    }
}
export default function Habit({ params }: Props) {
    const id = params.id
    console.log("habit id: ", id);
    return (
        <section className="w-full h-fit flex flex-col gap-12 px-4">
            habit page {id}
        </section>
    )
}
