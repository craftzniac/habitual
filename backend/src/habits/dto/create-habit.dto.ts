import { OmitType } from '@nestjs/mapped-types';
import { UpdateHabitDto } from './update-habit.dto';

export class CreateHabitDto extends OmitType(UpdateHabitDto, ['id'] as const) { }
