import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class UpdateHabitDto {
  @IsNotEmpty({ message: 'Habit id should not be empty' })
  @IsString({ message: 'Provide a valid habit id' })
  id: string;

  @IsNotEmpty({ message: 'User Id should not be empty' })
  @IsString({ message: 'Provide a valid user id' })
  userId: string;

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
}
