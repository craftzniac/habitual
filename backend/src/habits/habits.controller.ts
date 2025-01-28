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
  ) {}
  @Get()
  async getAll(@Req() request: any, @Query('filter') filter: HabitFilter) {
    const userAccountId = request.userAccount.sub;
    const res = await this.habitsService.getUserAccountHabits({
      userAccountId,
      filter,
    });

    const habits = [];
    for (const habit of res.habits) {
      delete habit.deletedAt;
      const { consistencyInPercent } =
        await this.habitDaysService.getHabitDaysAndHabitConsistency(habit);
      habits.push({ ...habit, consistencyInPercent });
    }

    return {
      ...res,
      habits,
    };
  }

  @Get(':id')
  async getOne(@Param('id') habitId: string, @Req() request: any) {
    const userAccountId = request.userAccount.sub;
    const res = await this.habitsService.getHabit(userAccountId, habitId);

    delete res.habit.deletedAt;

    const { consistencyInPercent } =
      await this.habitDaysService.getHabitDaysAndHabitConsistency(res.habit);

    return {
      habit: { ...res.habit, consistencyInPercent },
    };
  }

  @Get(':id/habit-days')
  async getHabitDays(@Param('id') habitId: string, @Req() req: any) {
    const userAccountId = req.userAccount.sub;
    const { habit } = await this.habitsService.getHabit(userAccountId, habitId);
    return this.habitDaysService.getAll(habit);
  }

  @Get(':id/habit-days/:slug/journal-entry')
  async getHabitDayJournalEntry(
    @Param('slug') slug: string,
    @Req() request: any,
    @Param('id') habitId: string,
  ) {
    const userAccountId = request.userAccount.sub;
    const habitRes = await this.habitsService.getHabit(userAccountId, habitId);
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
    const userAccountId = request.userAccount.sub;
    const habitRes = await this.habitsService.getHabit(userAccountId, habitId);
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
      userAccountId,
    );
  }

  @HttpCode(201)
  @Put(':id/habit-days')
  async upsertHabitDay(
    @Param('id') habitId: string,
    @Body(ValidationPipe) habitDayDto: UpsertHabitDayDto,
    @Req() req: any,
  ) {
    const userAccountId = req.userAccount.sub;
    return await this.habitDaysService.upsert(
      habitId,
      habitDayDto,
      userAccountId,
    );
  }

  @HttpCode(201)
  @Post()
  async create(
    @Body(ValidationPipe) createHabitDto: CreateOrUpdateHabitDto,
    @Req() request: any,
  ) {
    const userAccountId = request.userAccount.sub;
    const res = await this.habitsService.create(userAccountId, createHabitDto);

    delete res.habit.deletedAt;

    const { consistencyInPercent } =
      await this.habitDaysService.getHabitDaysAndHabitConsistency(res.habit);
    return {
      habit: { ...res.habit, consistencyInPercent },
    };
  }

  @Put(':id')
  update(
    @Body(ValidationPipe) updateHabitDto: CreateOrUpdateHabitDto,
    @Param('id') habitId: string,
    @Req() request: any,
  ) {
    const userAccountId = request.userAccount.sub;
    return this.habitsService.update(userAccountId, habitId, updateHabitDto);
  }

  /**
   * Delete a habit
   * */
  @Delete(':id')
  async delete(@Param('id') habitId: string) {
    // delete all habit days associated with this habit;
    await this.habitDaysService.deleteAllForHabit(habitId);
    // then delete the actual habit
    return this.habitsService.delete(habitId);
  }
}
