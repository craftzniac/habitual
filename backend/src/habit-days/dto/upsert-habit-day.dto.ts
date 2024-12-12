import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertHabitDayDto {
  @IsNotEmpty({ message: 'A date must be provided for this habit day' })
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsString({ message: 'habit day id must be valid' })
  id?: string;

  // @IsNotEmpty({ message: ' must be provided for this habit day' })
  // @Type(() => Date)
  // habitStartDate: Date;

  @IsBoolean({ message: 'isCompleted must be true or false' })
  @IsOptional()
  isCompleted?: boolean;
}
