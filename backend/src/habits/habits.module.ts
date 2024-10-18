import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entity/habit.entity';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([Habit])],
})
export class HabitsModule {}
