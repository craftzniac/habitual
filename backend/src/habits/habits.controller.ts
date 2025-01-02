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
  Patch,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateOrUpdateHabitDto } from './dto/create-or-update-habit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HabitFilter } from 'src/types';
import { HabitDaysService } from 'src/habit-days/habit-days.service';
import { UpsertHabitDayDto } from 'src/habit-days/dto/upsert-habit-day.dto';
import {
  getDatestamp,
  isValidHabitDayTimestamp,
  isValidTimestamp,
} from 'src/utils';
import { UpsertJournalEntryDto } from 'src/habit-days/dto/upsert-journal-entry.dto';

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
    const userId = request.user.sub;
    const habitRes = await this.habitsService.getHabit(userId, habitId);
    const habit = habitRes.habit;
    if (!isValidTimestamp(slug)) {
      throw new BadRequestException('Invalid Habit Journal date');
    }
    const timestamp = getDatestamp(slug);
    // check to make sure this timestamp represents a day in the habit days
    if (
      !isValidHabitDayTimestamp({
        timestamp,
        frequency: habit.frequency || [],
        durationInDays: habit.durationInDays,
        startDate: habit.startDate,
      })
    ) {
      return new BadRequestException('Habit date is unknown');
    }

    return await this.habitDaysService.getNoteByTimestamp(timestamp);
  }

  @Patch(':id/habit-days/:slug/journal-entry')
  async updateHabitDayJournalEntry(
    @Param('slug') slug: string,
    @Req() request: any,
    @Param('id') habitId: string,
    @Body(ValidationPipe) upsertJournalEntryDto: UpsertJournalEntryDto,
  ) {
    const userId = request.user.sub;
    const habitRes = await this.habitsService.getHabit(userId, habitId);
    const habit = habitRes.habit;
    if (!isValidTimestamp(slug)) {
      throw new BadRequestException('Invalid Habit Journal date');
    }
    const timestamp = getDatestamp(slug);
    // check to make sure this timestamp represents a day in the habit days
    if (
      !isValidHabitDayTimestamp({
        timestamp,
        frequency: habit.frequency || [],
        durationInDays: habit.durationInDays,
        startDate: habit.startDate,
      })
    ) {
      return new BadRequestException('Invalid Habit journal date');
    }

    return await this.habitDaysService.upsertJournalEntry(
      timestamp,
      upsertJournalEntryDto.note,
      habitId,
    );
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
    @Body(ValidationPipe) createHabitDto: CreateOrUpdateHabitDto,
    @Req() request: any,
  ) {
    const userId = request.user.sub;
    return this.habitsService.create(userId, createHabitDto);
  }

  @Put(':id')
  update(
    @Body(ValidationPipe) updateHabitDto: CreateOrUpdateHabitDto,
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
