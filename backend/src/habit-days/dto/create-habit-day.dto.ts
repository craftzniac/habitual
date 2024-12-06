import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHabitDayDto {
  @IsNotEmpty({ message: 'A date must be provided for this habit day' })
  @Type(() => Date)
  date: Date;

  // @IsNotEmpty({ message: ' must be provided for this habit day' })
  // @Type(() => Date)
  // habitStartDate: Date;

  @IsBoolean({ message: 'isCompleted must be true or false' })
  @IsOptional()
  isCompleted?: boolean;
}
