import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHabitNoteDto {
  @IsString({ message: 'Habit day note must be a text' })
  @IsNotEmpty({ message: 'Habit day note must be provided' })
  note: string;
}
