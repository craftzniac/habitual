import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

// get habits - GET /v1/habits
// add new habit - POST / habits /: id
// update a habit - PUT / habits /: id
// delete a habit - DELETE / habits /: id

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}
  @Get()
  getAll() {
    const userId = 'nkioijefafai';
    return this.habitsService.getUserHabits(userId);
  }

  @Post()
  create(@Body(ValidationPipe) createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Put(':id')
  update(@Body(ValidationPipe) updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(updateHabitDto);
  }

  @Delete(':id')
  delete(habitId: string) {
    return this.habitsService.delete(habitId);
  }
}
