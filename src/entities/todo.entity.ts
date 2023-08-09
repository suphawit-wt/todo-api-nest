import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@app/entities';
import { CreateTodoRequest } from '@app/common/dto/request';

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

  static create(req: CreateTodoRequest, userId: number): Todo {
    const user = new User();
    user.id = userId;

    const todo = new Todo();
    todo.title = req.title;
    todo.user = user;

    return todo;
  }
}