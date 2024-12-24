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
  Query,
  BadRequestException,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HabitFilter } from 'src/types';
import { HabitDaysService } from 'src/habit-days/habit-days.service';
import { UpsertHabitDayDto } from 'src/habit-days/dto/upsert-habit-day.dto';
import {
  generateHabitDays,
  getExcludedDaysFromFrequency,
  getUTCDateString,
  isValidDateString,
} from 'src/utils';

@Controller('habits')
@UseGuards(AuthGuard)
export class HabitsController {
  constructor(
    private habitsService: HabitsService,
    private habitDaysService: HabitDaysService,
  ) { }
  @Get()
  getAll(@Req() request: any, @Query('filter') filter: HabitFilter) {
    const userId = request.user.sub;
    return this.habitsService.getUserHabits({ userId, filter });
  }

  @Get(':id')
  getOne(@Param('id') habitId: string, @Req() request: any) {
    const userId = request.user.sub;
    return this.habitsService.getHabit(userId, habitId);
  }

  @Get(':id/habit-days')
  getHabitDays(@Param('id') habitId: string) {
    return this.habitDaysService.getAll(habitId);
  }

  @Get(':id/habit-days/:slug/journal-entry')
  async getHabitDayJournalEntry(
    @Param('slug') slug: string,
    @Req() request: any,
    @Param('id') habitId: string,
  ) {
    if (isValidDateString(slug) === true) {
      // check to make sure this date represents a day in the habit days
      const userId = request.user.sub;
      const habitRes = await this.habitsService.getHabit(userId, habitId);
      const habit = habitRes.habit;

      // GENERate habit days for this habit and check if this date matches any habit date.
      const habitDayDates = generateHabitDays({
        excludedDays: getExcludedDaysFromFrequency(habit.frequency || []),
        durationInDays: habit.durationInDays,
        startDateString: habit.startDate,
      });
      //2. check that the slug (which is a date string) represents a valid habit day for this habit
      const isFound = habitDayDates.find((d) => {
        const dd = getUTCDateString(new Date(d.date));
        if (dd === getUTCDateString(new Date(slug))) return true;
        else return false;
      });
      if (!isFound) {
        return new BadRequestException('Habit date is unknown');
      }

      return await this.habitDaysService.getNoteByDate(slug);
    }
    return await this.habitDaysService.getNoteById(slug);
  }

  @HttpCode(201)
  @Put(':id/habit-days')
  async upsertHabitDay(
    @Param('id') habitId: string,
    @Body(ValidationPipe) habitDayDto: UpsertHabitDayDto,
  ) {
    return await this.habitDaysService.upsert(habitId, habitDayDto);
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
  async delete(@Param('id') habitId: string) {
    // delete all habit days associated with this habit;
    await this.habitDaysService.deleteAll(habitId);
    // then delete the actual habit
    return this.habitsService.delete(habitId);
  }
}
