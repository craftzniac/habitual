import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'No refresh token provided' })
  @IsString({ message: 'Refresh token must be a valid string' })
  refreshToken: string;
}
