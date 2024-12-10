import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entity/habit.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HabitDaysModule } from 'src/habit-days/habit-days.module';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([Habit]), AuthModule, HabitDaysModule],
})
export class HabitsModule { }
