import HabitCard from "../components/presentation/HabitCard";
import ErrorPage from "./error-page";

export default async function Habits() {
    // console.log("res:", res);
    // if (res.success === false) {
    //     console.log("error just occured:", res.message);
    //     return <ErrorPage errorMsg={res.message} />
    // }
    return (
        <section className="w-full h-fit flex flex-col gap-4 px-4">
            <ul className="flex flex-col gap-4 w-full h-full">
                {
                    // res.data.map(habit => (
                    //     <HabitCard
                    //         key={habit.id}
                    //         habit={habit}
                    //     />
                    // ))
                }
            </ul>
        </section>
    )
}


