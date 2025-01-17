import {
  IsEmail,
  IsNotEmpty,
  Matches,
  Length,
  IsString,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Provide a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @IsOptional()
  profileImage?: string;

  @IsNotEmpty({ message: 'Username must not be empty' })
  @IsString({ message: 'Provide a valid Username' })
  @Matches(/^\S*$/, { message: 'Username cannot contain any spaces' })
  username: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  password: string;
}
