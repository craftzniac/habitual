import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Repository } from 'typeorm';
import { Habit } from './entity/habit.entity';
import { HabitFilter } from 'src/types';
import {
  generateHabitDays,
  getDateString,
  getExcludedDaysFromFrequency,
} from 'src/utils';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
  ) { }

  /**
   * Finds all habits for a specific user
   * */
  async getUserHabits({
    userId,
    filter,
  }: {
    userId: string;
    filter: HabitFilter;
  }): Promise<{
    habits: Habit[];
    filter?: HabitFilter;
  }> {
    if (filter === 'today') {
      let habits = await this.habitsRepository.find({ where: { userId } });
      // get only habits that have a habit day matching today
      habits = habits.filter((habit) => {
        const habitDays = generateHabitDays({
          startDateString: habit.startDate as any as string, // habit.startDate isn't really a date object hence the conversion
          durationInDays: habit.durationInDays,
          excludedDays: getExcludedDaysFromFrequency(habit.freqency),
        });

        const today = new Date();
        for (const habitDay of habitDays) {
          if (getDateString(habitDay.date) === getDateString(today)) {
            return true;
          }
        }

        return false;
      });
      return {
        habits,
        filter,
      };
    }

    if (filter === 'completed' || filter === 'on-going') {
      const habits = await this.habitsRepository.find({
        where: { userId, status: filter },
      });
      return {
        habits,
        filter,
      };
    }

    // just gets all user's habits
    const habits = await this.habitsRepository.find({
      where: { userId },
    });
    return {
      habits,
    };
  }

  async create(
    userId: string,
    createHabitDto: CreateHabitDto,
  ): Promise<{ habit: Habit }> {
    const habitEntity = this.habitsRepository.create({
      name: createHabitDto.name,
      startDate: createHabitDto.startDate,
      durationInDays: createHabitDto.durationInDays,
      description: createHabitDto.description ?? '',
      freqency: createHabitDto.frequency,
      reminders: createHabitDto.reminders,
      userId,
    });
    const habit = await this.habitsRepository.save(habitEntity);
    return {
      habit,
    };
  }

  async update(
    userId: string,
    id: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<{ habit: Habit }> {
    await this.habitsRepository.update(
      { id },
      {
        name: updateHabitDto.name,
        startDate: updateHabitDto.startDate,
        durationInDays: updateHabitDto.durationInDays,
        description: updateHabitDto.description,
        freqency: updateHabitDto.frequency,
        reminders: updateHabitDto.reminders,
        userId,
      },
    );
    const updatedHabit = await this.habitsRepository.findOneBy({ id });
    if (!updatedHabit) {
      throw new InternalServerErrorException('Something went wrong', {
        description: 'Could not find the habit',
      });
    }
    return { habit: updatedHabit };
  }

  async delete(habitId: string): Promise<{ id: string }> {
    await this.habitsRepository.softDelete({ id: habitId });
    return { id: habitId };
  }
}
