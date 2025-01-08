import { daysOfWeek } from 'src/constants';
import { DayOfWeek, ReminderTime } from 'src/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'timestamptz', nullable: false })
  startDate: string;

  // @Column({ nullable: false, default: 'on-going' })
  // status: 'completed' | 'on-going';

  @Column({ nullable: false, default: 0 })
  consistencyInPercent: number;

  @Column('varchar', { array: true, default: [...daysOfWeek], nullable: false })
  frequency: DayOfWeek[];

  @Column('varchar', { array: true, default: [], nullable: false })
  reminders: ReminderTime[];

  @Column({ type: 'int', nullable: false })
  durationInDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
