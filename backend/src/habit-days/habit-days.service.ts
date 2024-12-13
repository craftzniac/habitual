import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitDay } from './entity/habit-day.entity';
import { Repository } from 'typeorm';
import { UpsertHabitDayDto } from './dto/upsert-habit-day.dto';
import { CreateHabitDayDto } from './dto/create-habit-day.dto';

@Injectable()
export class HabitDaysService {
  constructor(
    @InjectRepository(HabitDay)
    private habitDaysRepository: Repository<HabitDay>,
  ) { }

  /**
   * get all habit days for a particular user habit
   * */
  async getAll(habitId: string) {
    const habitDays = await this.habitDaysRepository.find({
      where: { habitId },
    });
    return {
      habitDays,
      habitId,
    };
  }

  /**
   * update habit day if it already exist, else create a new one
   * */
  async upsert(habitId: string, habitDayDto: UpsertHabitDayDto) {
    // create a new habit day
    if (!habitDayDto.id) {
      return await this.create(habitId, habitDayDto);
    }
    // find the already existing habit day and update it
    let habitDay = await this.habitDaysRepository.findOneBy({
      id: habitDayDto.id,
    });
    if (!habitDay) {
      return await this.create(habitId, habitDayDto);
    }

    habitDay.isCompleted = habitDayDto.isCompleted;
    habitDay = await this.habitDaysRepository.save(habitDay);
    return {
      habitDay,
      operation: 'update',
    };
  }

  /**
   * create a new habit day that is associated to a habit via a habitId
   * */
  async create(habitId: string, createDayDto: CreateHabitDayDto) {
    const habitDayEntity = this.habitDaysRepository.create({
      date: createDayDto.date,
      isCompleted: createDayDto.isCompleted,
      habitId,
    });
    const habitDay = await this.habitDaysRepository.save(habitDayEntity);
    return {
      habitDay,
      operation: 'create',
    };
  }

  async delete(id: string) {
    await this.habitDaysRepository.delete({ id });
    return {
      habitId: id,
    };
  }

  /**
   * Delete all habit days associated with a specific habit
   * */
  async deleteAll(habitId: string) {
    const res = await this.habitDaysRepository.delete({ habitId });
    return {
      habitId,
      deleteCount: res.affected,
    };
  }
}
