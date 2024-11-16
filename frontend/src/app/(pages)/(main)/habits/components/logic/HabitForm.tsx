import DateField from "@/app/components/presentation/form/DateField";
import DurationSelect from "@/app/components/presentation/form/DurationSelect";
import TextArea from "@/app/components/presentation/form/TextArea";
import TextField from "@/app/components/presentation/form/TextField";

export default function HabitForm() {
    const options = [
        { label: "Sunday", value: "sunday" },
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
    ]
    return (
        <form className="w-full flex flex-col gap-4">
            <TextField name="name" label="Name" placeholder="reading 'deep work'" />
            <TextArea name="description" label="Description" placeholder="I will be reading ..." />
            <DateField name="startDate" label="Start Date" placeholder="Select a Start Date" />
            <DurationSelect name="durationInDays" label="Duration" />
            {
                /*
                 *
                 *
            <SelectField name="days" label="Days" options={options} />
                 *
                 * */

            }
        </form>
    )
}
