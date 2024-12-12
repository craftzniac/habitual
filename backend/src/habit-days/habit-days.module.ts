import { Module } from '@nestjs/common';
import { HabitDaysService } from './habit-days.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitDay } from './entity/habit-day.entity';
import { HabitDaysController } from './habit-days.controller';

@Module({
  providers: [HabitDaysService],
  exports: [HabitDaysService],
  imports: [TypeOrmModule.forFeature([HabitDay])],
  controllers: [HabitDaysController],
})
export class HabitDaysModule { }
