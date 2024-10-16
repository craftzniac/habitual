import { Injectable, NotFoundException } from '@nestjs/common';
// import { Habit } from 'src/types';
import { habits } from 'src/mockData';
import { CreateHabitDto } from './dto/create-habit.dto';
import { generateId } from 'src/utils';
import { Habit } from 'src/types';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  habits = habits;

  getUserHabits(userId: string) {
    return habits.filter((habit) => habit.userId === userId);
  }

  create(createHabitDto: CreateHabitDto): Habit {
    const id = generateId();
    const createdAt = new Date().toISOString();
    const newHabit = {
      id,
      userId: createHabitDto.userId,
      name: createHabitDto.name,
      description: createHabitDto.description ?? '',
      startDate: createHabitDto.startDate,
      durationInDays: createHabitDto.durationInDays,
      createdAt,
      updatedAt: createdAt,
    };
    this.habits.push(newHabit);
    return newHabit;
  }

  update(updateHabitDto: UpdateHabitDto): Habit {
    const habit = this.habits.find((habit) => habit.id === updateHabitDto.id);
    if (!habit) {
      throw new NotFoundException('Habit not found', {
        description: 'Requested Habit does not exist',
      });
    }
    habit.durationInDays = updateHabitDto.durationInDays;
    habit.startDate = updateHabitDto.startDate;
    habit.description = updateHabitDto.description ?? '';
    habit.name = updateHabitDto.name;
    return habit;
  }

  delete(habitId: string): { isDeleted: boolean; habitId: string } {
    this.habits = this.habits.filter((habit) => habit.id !== habitId);
    return { isDeleted: true, habitId };
  }
}
