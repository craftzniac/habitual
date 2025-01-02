import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrUpdateHabitDto } from './dto/create-or-update-habit.dto';
import { Repository } from 'typeorm';
import { Habit } from './entity/habit.entity';
import { HabitFilter } from 'src/types';
import {
  generateHabitDays,
  getExcludedDaysFromFrequency,
  getDatestamp,
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
          startDateString: habit.startDate,
          durationInDays: habit.durationInDays,
          excludedDays: getExcludedDaysFromFrequency(habit.frequency),
        });

        const todayDateTimestamp = getDatestamp(new Date().getTime());
        for (const habitDay of habitDays) {
          if (habitDay.timestamp === todayDateTimestamp) {
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
    createHabitDto: CreateOrUpdateHabitDto,
  ): Promise<{ habit: Habit }> {
    const habitEntity = this.habitsRepository.create({
      name: createHabitDto.name,
      startDate: createHabitDto.startDate as any as string, // createHabitDto.startDate is actually a string not an actual Date object
      durationInDays: createHabitDto.durationInDays,
      description: createHabitDto.description ?? '',
      frequency: createHabitDto.frequency,
      reminders: createHabitDto.reminders,
      userId,
    });
    const habit = await this.habitsRepository.save(habitEntity);
    return {
      habit,
    };
  }

  async getHabit(userId: string, id: string): Promise<{ habit: Habit }> {
    const exceptionMsg = 'Habit does not exist';
    try {
      const habit = await this.habitsRepository.findOneBy({ id, userId });
      if (!habit) {
        throw new NotFoundException(exceptionMsg);
      }
      return { habit };
    } catch (err) {
      const invalidUUID =
        'QueryFailedError: invalid input syntax for type uuid';
      if (err.toString().includes(invalidUUID)) {
        throw new NotFoundException(exceptionMsg);
      }
      throw new NotFoundException(exceptionMsg);
    }
  }

  async update(
    userId: string,
    id: string,
    updateHabitDto: CreateOrUpdateHabitDto,
  ): Promise<{ habit: Habit }> {
    await this.habitsRepository.update(
      { id },
      {
        name: updateHabitDto.name,
        startDate: updateHabitDto.startDate as any as string, // updateHabitDto.startDate is actually a string not an actual Date object
        durationInDays: updateHabitDto.durationInDays,
        description: updateHabitDto.description,
        frequency: updateHabitDto.frequency,
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
