import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitDay } from './entity/habit-day.entity';
import { Repository } from 'typeorm';
import { UpsertHabitDayDto } from './dto/upsert-habit-day.dto';
import {
  calculateConsistencyInPercent,
  generateHabitDaysTimestamps,
  getDatestamp,
  getExcludedDaysFromFrequency,
  getHabitDaysTimestampsInfo,
} from 'src/utils';
import { Habit } from 'src/habits/entity/habit.entity';

@Injectable()
export class HabitDaysService {
  constructor(
    @InjectRepository(HabitDay)
    private habitDaysRepository: Repository<HabitDay>,
  ) {}

  async calculateHabitConsistencyInPercent({
    habitDays,
    habit,
  }: {
    habitDays: (Omit<HabitDay, 'timestamp'> & { timestamp: number })[];
    habit: Habit;
  }): Promise<number> {
    const generatedDaysTimestamps = generateHabitDaysTimestamps({
      excludedDays: getExcludedDaysFromFrequency(habit.frequency),
      durationInDays: habit.durationInDays,
      startDateString: habit.startDate,
    });

    const { remainingDaysTimestamps } = getHabitDaysTimestampsInfo(
      generatedDaysTimestamps,
    );

    const completedDays = habitDays.filter((day) => day.isCompleted === true);

    const completedDaysCount = completedDays.length;
    const totalDaysCount = habit.durationInDays;
    const remainingDaysCount = remainingDaysTimestamps.length;

    const consistency = calculateConsistencyInPercent({
      completedDaysCount,
      totalDaysCount,
      remainingDaysCount,
    });
    return consistency;
  }

  // since computing habit consistency requires fetching habit days, might as well lump both functionalities to avoid unnecessary database calls
  async getHabitDaysAndHabitConsistency(habit: Habit) {
    const _habitDays = await this.habitDaysRepository.find({
      where: { habitId: habit.id },
      select: ['timestamp', 'habitId', 'isCompleted'],
    });
    const habitDays = _habitDays.map((d) => ({
      ...d,
      timestamp: parseInt(d.timestamp),
    }));
    // calculate habit consistency in percent
    const consistency = await this.calculateHabitConsistencyInPercent({
      habitDays,
      habit,
    });

    return {
      habitDays,
      habitId: habit.id,
      consistencyInPercent: consistency,
    };
  }

  /**
   * get all habit days for a particular user habit
   * */
  async getAll(habit: Habit) {
    const { consistencyInPercent, habitId, habitDays } =
      await this.getHabitDaysAndHabitConsistency(habit);
    return {
      consistencyInPercent,
      habitDays,
      habitId,
    };
  }

  /**
   * get journal entry for habit day matching a timestamp
   * */
  async getNoteByTimestamp(datestamp: number) {
    const habitDay = await this.habitDaysRepository.findOne({
      where: { timestamp: String(datestamp) },
      select: ['timestamp', 'note'],
    });
    if (!habitDay) {
      return {
        timestamp: datestamp,
        note: '',
      };
    }
    return {
      note: habitDay.note,
      timestamp: parseInt(habitDay.timestamp),
    };
  }

  /**
   * update habit day's journal entry
   * */
  async upsertJournalEntry(timestamp: number, note: string, habitId: string) {
    let habitDay = await this.habitDaysRepository.findOne({
      where: { timestamp: String(timestamp) },
      select: ['note', 'timestamp'],
    });
    if (!habitDay) {
      const createHabitDayDto = new UpsertHabitDayDto();
      createHabitDayDto.timestamp = timestamp;
      createHabitDayDto.isCompleted = false;
      const newHabitDay = (await this.create(habitId, createHabitDayDto))
        .habitDay;
      habitDay = { ...newHabitDay, timestamp: String(newHabitDay.timestamp) };
    }

    habitDay.note = note;
    await this.habitDaysRepository.save(habitDay);
    return {
      entry: {
        note: habitDay.note,
        timestamp: parseInt(habitDay.timestamp),
      },
    };
  }

  /**
   * update habit day if it already exist, else create a new one
   * */
  async upsert(habitId: string, habitDayDto: UpsertHabitDayDto) {
    const datestamp = getDatestamp(habitDayDto.timestamp);
    // find a record matching the timestamp. If such record does not exist, create it.
    let habitDay = await this.habitDaysRepository.findOne({
      where: { timestamp: String(datestamp), habitId },
    });

    if (!habitDay) {
      return await this.create(habitId, habitDayDto);
    }
    habitDay.isCompleted = habitDayDto.isCompleted;
    habitDay = await this.habitDaysRepository.save(habitDay);
    delete habitDay.note;
    delete habitDay.deletedAt;
    return {
      habitDay: { ...habitDay, timestamp: parseInt(habitDay.timestamp) },
      operation: 'update',
    };
  }

  /**
   * create a new habit day that is associated to a habit via a habitId
   * */
  async create(habitId: string, createDayDto: UpsertHabitDayDto) {
    const dateTimestamp = getDatestamp(createDayDto.timestamp);
    const habitDayEntity = this.habitDaysRepository.create({
      timestamp: String(dateTimestamp),
      isCompleted: createDayDto.isCompleted,
      habitId,
    });
    const habitDay = await this.habitDaysRepository.save(habitDayEntity);
    delete habitDay.note;
    delete habitDay.deletedAt;
    return {
      habitDay: { ...habitDay, timestamp: parseInt(habitDay.timestamp) },
      operation: 'create',
    };
  }

  async delete(timestamp: number) {
    const dateStamp = getDatestamp(timestamp);
    await this.habitDaysRepository.delete({ timestamp: String(dateStamp) });
    return {
      timestamp,
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
