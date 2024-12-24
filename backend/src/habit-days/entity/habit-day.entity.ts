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

  @Column({ nullable: false })
  habitId: string;

  // @Column({ nullable: false, type: 'timestamptz' })
  // habitStartDate: Date;

  @Column({ nullable: false, type: 'timestamptz' })
  date: string;

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
