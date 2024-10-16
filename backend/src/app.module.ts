import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HabitsController } from './habits/habits.controller';
import { HabitsService } from './habits/habits.service';
import { HabitsModule } from './habits/habits.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), HabitsModule, UsersModule, AuthModule],
  controllers: [AppController, HabitsController],
  providers: [AppService, HabitsService],
})
export class AppModule { }
