import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('habits')
@UseGuards(AuthGuard)
export class HabitsController {
  constructor(private habitsService: HabitsService) { }
  @Get()
  getAll(@Req() request: any) {
    const userId = request.user.sub;
    return this.habitsService.getUserHabits(userId);
  }

  @HttpCode(201)
  @Post()
  create(
    @Body(ValidationPipe) createHabitDto: CreateHabitDto,
    @Req() request: any,
  ) {
    const userId = request.user.sub;
    return this.habitsService.create(userId, createHabitDto);
  }

  @Put(':id')
  update(
    @Body(ValidationPipe) updateHabitDto: UpdateHabitDto,
    @Param('id') habitId: string,
    @Req() request: any,
  ) {
    const userId = request.user.sub;
    return this.habitsService.update(userId, habitId, updateHabitDto);
  }

  @Delete(':id')
  delete(@Param('id') habitId: string) {
    return this.habitsService.delete(habitId);
  }
}
