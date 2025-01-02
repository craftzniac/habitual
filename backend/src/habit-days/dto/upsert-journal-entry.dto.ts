import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpsertJournalEntryDto {
  @Transform(({ value }) => (value != null ? String(value) : ''))
  @IsString({ message: 'Note must be provided' })
  note: string;
}
