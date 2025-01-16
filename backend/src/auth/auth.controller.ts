import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from './auth.guard';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { HabitsService } from 'src/habits/habits.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private habitsService: HabitsService,
  ) { }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      transform: true, // automatically transform payloads to dto instances
      whitelist: true, // strip properties not in the dto
    }),
  )
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: any) {
    const userId = req['user'].sub;
    return this.authService.getCurrentUser(userId);
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @Post('refresh-token')
  refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Delete('account/delete')
  async deleteAccount(@Req() request: any) {
    const userId = request['user'].sub;
    await this.habitsService.deleteAllUserHabits(userId);
    return await this.authService.deleteAccount(userId);
  }
}
