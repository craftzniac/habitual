import { Module } from '@nestjs/common';
import { HabitDaysService } from './habit-days.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitDay } from './entity/habit-day.entity';

@Module({
  providers: [HabitDaysService],
  exports: [HabitDaysService],
  imports: [TypeOrmModule.forFeature([HabitDay])],
})
export class HabitDaysModule { }
