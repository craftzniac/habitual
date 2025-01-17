import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateUsernameDto {
  @IsNotEmpty({ message: 'A new username must be provided' })
  @Matches(/^\S*$/, { message: 'Username cannot contain any spaces' })
  username: string;
}
