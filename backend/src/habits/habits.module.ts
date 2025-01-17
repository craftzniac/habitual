import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entity/habit.entity';
import { HabitDaysModule } from 'src/habit-days/habit-days.module';

@Module({
  controllers: [HabitsController],
  exports: [HabitsService],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([Habit]), HabitDaysModule],
})
export class HabitsModule {}
