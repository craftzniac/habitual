import { OmitType } from '@nestjs/mapped-types';
import { UpsertHabitDayDto } from './upsert-habit-day.dto';

export class CreateHabitDayDto extends OmitType(UpsertHabitDayDto, [
  'id',
] as const) { }
