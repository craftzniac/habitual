import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService) {}

  @Post()
  async create(@Body() createUserDto) {
    return this.usersService.create(createUserDto);
  }
}
