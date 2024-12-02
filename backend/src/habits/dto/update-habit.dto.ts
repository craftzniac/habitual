import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
  Validate,
} from 'class-validator';
import { DayOfWeek, ReminderTime } from 'src/types';
import { DayOfWeekArray, HabitReminderArray } from './custom-validators';

export class UpdateHabitDto {
  @IsNotEmpty({ message: 'Habit id should not be empty' })
  @IsString({ message: 'Provide a valid habit id' })
  id: string;

  @IsNotEmpty()
  @IsString({ message: 'Provide a valid name' })
  name: string;

  @IsString({ message: 'Provide a valid description' })
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDate({ message: 'Start Date must be a valid date' })
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty({ message: 'Duration should not be empty' })
  @IsNumber({}, { message: 'Duration must be a valid number' })
  durationInDays: number;

  @Validate(DayOfWeekArray, {
    message: 'Frequency must only contain days of the week',
  })
  frequency?: DayOfWeek[];

  @Validate(HabitReminderArray, {
    message: 'Reminders must include only valid preset time values',
  })
  reminders?: ReminderTime[];
}
