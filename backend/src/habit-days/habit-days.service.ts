import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitDay } from './entity/habit-day.entity';
import { Repository } from 'typeorm';
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
      habitId
    };
  }

  /**
   * create a new habit day that is associated to a habit via a habitId
   * */
  async create(habitId: string, habitDayDto: CreateHabitDayDto) {
    const habitDayEntity = this.habitDaysRepository.create({
      date: habitDayDto.date,
      isCompleted: habitDayDto.isCompleted,
      habitId,
    });
    const habitDay = await this.habitDaysRepository.save(habitDayEntity);
    return {
      habitDay,
    };
  }
}
