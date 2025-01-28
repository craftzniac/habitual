import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAccountsModule } from 'src/user-accounts/user-accounts.module';
import { ConfigModule } from '@nestjs/config';
import { HabitDaysModule } from 'src/habit-days/habit-days.module';
import { HabitsModule } from 'src/habits/habits.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserAccountsModule,
    ConfigModule.forRoot(),
    HabitDaysModule,
    HabitsModule,
  ],
})
export class AuthModule {}
