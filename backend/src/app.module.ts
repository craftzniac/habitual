import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HabitDaysModule } from './habit-days/habit-days.module';

config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    HabitsModule,
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    HabitDaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
