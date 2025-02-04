import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HabitDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // habit days with the same timestamp can exist for different habits for different users, so this can't be the primary column
  @Column({ nullable: false, type: 'bigint' })
  timestamp: string;

  @Column({ nullable: false })
  habitId: string;

  @Column({ nullable: false })
  userAccountId: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ nullable: true, default: '' })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
