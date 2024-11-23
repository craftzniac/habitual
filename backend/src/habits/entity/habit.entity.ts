import { DayOfWeek } from 'src/types';
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

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ nullable: false, default: 'on-going' })
  status: 'completed' | 'on-going';

  @Column('varchar', { array: true, default: [] })
  excludedDays: DayOfWeek[];

  @Column({ type: 'int', nullable: false })
  durationInDays: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
