import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Repository } from 'typeorm';
import { Habit } from './entity/habit.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
  ) { }

  /**
   * Finds all habits for a specific user
   * */
  async getUserHabits(userId: string): Promise<Habit[]> {
    const habits = await this.habitsRepository.find({ where: { userId } });
    return habits;
  }

  async create(userId: string, createHabitDto: CreateHabitDto): Promise<Habit> {
    const habitEntity = this.habitsRepository.create({
      name: createHabitDto.name,
      startDate: createHabitDto.startDate,
      durationInDays: createHabitDto.durationInDays,
      description: createHabitDto.description ?? '',
      userId,
    });
    const habit = await this.habitsRepository.save(habitEntity);
    return habit;
  }

  async update(
    userId: string,
    id: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<Habit> {
    await this.habitsRepository.update(
      { id },
      {
        description: updateHabitDto.description,
        userId,
        durationInDays: updateHabitDto.durationInDays,
        startDate: updateHabitDto.startDate,
        name: updateHabitDto.name,
      },
    );
    const updatedHabit = await this.habitsRepository.findOneBy({ id });
    if (!updatedHabit) {
      throw new InternalServerErrorException('Something went wrong', {
        description: 'Could not find the habit',
      });
    }
    return updatedHabit;
  }

  async delete(habitId: string): Promise<{ id: string }> {
    await this.habitsRepository.softDelete({ id: habitId });
    return { id: habitId };
  }
}
