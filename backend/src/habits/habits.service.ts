import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrUpdateHabitDto } from './dto/create-or-update-habit.dto';
import { Repository } from 'typeorm';
import { Habit } from './entity/habit.entity';
import { HabitFilter, HabitStatus } from 'src/types';
import { getHabitWithStatus } from 'src/utils';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
  ) {}

  /**
   * Finds all habits for a specific userAccount
   * */
  async getUserAccountHabits({
    userAccountId,
    filter,
  }: {
    userAccountId: string;
    filter: HabitFilter;
  }): Promise<{
    habits: Habit[];
    filter?: HabitFilter;
  }> {
    const _habits = await this.habitsRepository.find({
      where: { userAccountId },
    });
    let habits = _habits.map((habit) => getHabitWithStatus(habit));

    switch (filter) {
      case 'today':
        habits = habits.filter((h) => h.isToday);
        break;
      case 'on-going':
        habits = habits.filter((h) => h.status === 'on-going');
        break;
      case 'completed':
        habits = habits.filter((h) => h.status === 'completed');
        break;
      default:
      // basically do nothing
    }

    return {
      habits,
      filter,
    };
  }

  async create(
    userAccountId: string,
    createHabitDto: CreateOrUpdateHabitDto,
  ): Promise<{ habit: Habit }> {
    const habitEntity = this.habitsRepository.create({
      name: createHabitDto.name,
      startDate: createHabitDto.startDate as any as string, // createHabitDto.startDate is actually a string not an actual Date object
      durationInDays: createHabitDto.durationInDays,
      description: createHabitDto.description ?? '',
      frequency: createHabitDto.frequency,
      reminders: createHabitDto.reminders,
      userAccountId,
    });
    const habit = await this.habitsRepository.save(habitEntity);
    return {
      habit: getHabitWithStatus(habit),
    };
  }

  async getHabit(
    userAccountId: string,
    id: string,
  ): Promise<{ habit: Habit & { status: HabitStatus; isToday: boolean } }> {
    const exceptionMsg = 'Habit does not exist';
    try {
      const habit = await this.habitsRepository.findOneBy({
        id,
        userAccountId,
      });
      if (!habit) {
        throw new NotFoundException(exceptionMsg);
      }
      return { habit: getHabitWithStatus(habit) };
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
    userAccountId: string,
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
        userAccountId,
      },
    );
    const updatedHabit = await this.habitsRepository.findOneBy({ id });
    if (!updatedHabit) {
      throw new InternalServerErrorException('Something went wrong', {
        description: 'Could not find the habit',
      });
    }
    return { habit: getHabitWithStatus(updatedHabit) };
  }

  // delete a specific habit
  async delete(habitId: string): Promise<{ id: string }> {
    await this.habitsRepository.softDelete({ id: habitId });
    return { id: habitId };
  }

  async deleteAllUserAccountHabits(userAccountId: string) {
    await this.habitsRepository.delete({ userAccountId });
    return null;
  }
}
