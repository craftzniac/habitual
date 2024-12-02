import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { daysOfWeek, reminderTimeOptions } from 'src/constants';
import { DayOfWeek, ReminderTime } from 'src/types';
import { validateFiniteStringArray } from 'src/utils';

@ValidatorConstraint({ name: 'dayOfWeekArray', async: false })
export class DayOfWeekArray implements ValidatorConstraintInterface {
  validate(values: string[]): boolean {
    return validateFiniteStringArray<DayOfWeek>({
      userValues: values,
      defaultValues: daysOfWeek,
    });
  }

  defaultMessage(): string {
    return 'Invalid frequency value';
  }
}

@ValidatorConstraint({ name: 'reminderArray', async: false })
export class HabitReminderArray implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return validateFiniteStringArray<ReminderTime>({
      userValues: value,
      defaultValues: reminderTimeOptions,
    });
  }

  defaultMessage(): string {
    return `One or more reminder time is invalid`;
  }
}
