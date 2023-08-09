import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@app/entities';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}