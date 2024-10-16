import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Get('me')
  getProfile() {
    const email = 'gravity@gmail.com';
    return this.usersService.findOne(email);
  }
}
