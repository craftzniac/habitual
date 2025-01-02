import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpsertHabitDayDto {
  @IsNotEmpty({ message: 'Habit day timestamp must be provided' })
  @IsNumber({ allowNaN: false }, { message: 'timestamp must be a number' })
  timestamp: number;

  @IsBoolean({ message: 'isCompleted must be true or false' })
  @IsOptional()
  isCompleted?: boolean;
}
