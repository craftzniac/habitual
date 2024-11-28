"use client"
import Image from "next/image";
import DateField from "@/app/components/presentation/form/DateField";
import DurationSelect from "@/app/components/presentation/form/DurationSelect";
import TextArea from "@/app/components/presentation/form/TextArea";
import TextField from "@/app/components/presentation/form/TextField";
import { Plus_16_White } from "@/app/assets/icons";
import Button from "@/app/components/presentation/form/Button";
import RemindersInput from "../presentation/RemindersInput";
import MultiSelect from "@/app/components/presentation/form/MultiSelect";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TDayOfWeek, TReminderTime } from "@/app/utils/types";

type Inputs = {
    name: string,
    description: string,
    startDate: string,
    frequency: Set<TDayOfWeek>,
    durationInDays?: number,
    reminders: Set<TReminderTime>
}

export default function HabitForm({ mode }: { mode: "edit" | "add" }) {
    const { reset, control, register, handleSubmit, formState: {
        errors
    } } = useForm<Inputs>({
        defaultValues: {
            name: "",
            description: "",
            startDate: "",
            frequency: new Set([
                "sun", "mon", "tue", "wed", "thu", "fri", "sat"
            ]),
            durationInDays: undefined,
            reminders: new Set(),
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("data:", data);

        // reset();
    }

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField name="name" label="Name" placeholder="reading 'deep work'" register={register("name", { required: "A habit name must be provided" })} infoText={errors?.name?.message} />
            <TextArea name="description" label="Description" placeholder="I will be reading ..." register={register("description", { required: false })} errMsg={errors.description?.message} />
            <DateField name="startDate" label="Start Date" placeholder="Select a Start Date" register={register("startDate", { required: "A start date is required for this habit" })} errMsg={errors.startDate?.message} />
            <Controller
                name="frequency"
                control={control}
                rules={{
                    validate: value => {
                        if (value.size === 0) {
                            return "Select atleast one day of the week"
                        }
                        return true;
                    }
                }}
                render={({ field: { name, value, onChange, onBlur } }) => (
                    <MultiSelect name={name} label="Frequency" onChange={onChange} value={value} onBlur={onBlur} errMsg={errors.frequency?.message} placeholder="Select habit days" />
                )}
            />
            <Controller
                name="durationInDays"
                control={control}
                rules={{
                    validate: value => {
                        if (!value) {
                            return "A duration must be provided"
                        }
                        return true;
                    }
                }}
                render={({ field: { name, value, onChange, onBlur } }) => (
                    <DurationSelect name={name} label="Duration" onChange={onChange} value={value} onBlur={onBlur} errMsg={errors.durationInDays?.message} />
                )}
            />
            <Controller
                name="reminders"
                control={control}
                render={({ field: { name, value, onChange, onBlur } }) => (
                    <RemindersInput name={name} label="Reminders" onChange={onChange} value={value} onBlur={onBlur} errMsg={errors.reminders?.message} />
                )}
            />
            <Button isSubmit label="Add Habit" stretch>
                <Image src={Plus_16_White} alt="white plus icon" />
            </Button>
        </form>
    )
}
