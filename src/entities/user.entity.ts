import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Todo } from '@app/entities';
import { UserRole } from '@app/common/valueobjects';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Index('idx_users_username', { unique: true })
  username: string;

  @Column({ length: 60 })
  @Exclude()
  password: string;

  @Column({ length: 254 })
  @Index('idx_users_email', { unique: true })
  email: string;

  @Column({ name: 'first_name', length: 80 })
  firstName: string;

  @Column({ name: 'last_name', length: 80 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}