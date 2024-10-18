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
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) { }
  @Get()
  getAll() {
    const userId = 'nkioijefafai';
    return this.habitsService.getUserHabits(userId);
  }

  @HttpCode(201)
  @Post()
  create(@Body(ValidationPipe) createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Put(':id')
  update(
    @Body(ValidationPipe) updateHabitDto: UpdateHabitDto,
    @Param('id') habitId: string,
  ) {
    return this.habitsService.update(habitId, updateHabitDto);
  }

  @Delete(':id')
  delete(@Param('id') habitId: string) {
    return this.habitsService.delete(habitId);
  }
}
