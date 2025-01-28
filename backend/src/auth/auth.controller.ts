import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
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
import { UpdateUsernameDto } from './dto/update-username.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private habitsService: HabitsService,
  ) {}

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
    const userAccountId = req['userAccount'].sub;
    return this.authService.getCurrentUserAccount(userAccountId);
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
    const userAccountId = request['userAccount'].sub;
    await this.habitsService.deleteAllUserAccountHabits(userAccountId);
    return await this.authService.deleteAccount(userAccountId);
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @UseGuards(AuthGuard)
  @Patch('username')
  async updateUsername(@Body() body: UpdateUsernameDto, @Req() request: any) {
    const userAccountId = request['userAccount'].sub;
    return await this.authService.updateUsername(userAccountId, body.username);
  }
}
