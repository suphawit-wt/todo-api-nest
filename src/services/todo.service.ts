import { Injectable } from '@nestjs/common/decorators';
import { plainToInstance } from 'class-transformer';
import { ITodoService } from '@app/common/interfaces/services';
import { TodoRepository } from '@app/repositories';
import { Todo } from '@app/entities';
import { CreateTodoRequest, UpdateTodoRequest } from '@app/common/dto/request';
import { TodoResponse } from '@app/common/dto/response';
import { NotFoundError, ForbiddenError } from '@app/common/exceptions';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  async getTodos(userId: number): Promise<TodoResponse[]> {
    const todos: Todo[] = await this.todoRepository.getAllByUserId(userId);

    return todos.map((todo) => plainToInstance(TodoResponse, todo));
  }

  async getTodo(id: number, userId: number): Promise<TodoResponse> {
    const todo: Todo | null = await this.todoRepository.getByIdWithUser(id);
    if (!todo) {
      throw new NotFoundError('Todo not found.');
    }

    if (todo.user.id !== userId) {
      throw new ForbiddenError('You are not owner of this Todo.');
    }

    return plainToInstance(TodoResponse, todo);
  }

  async createTodo(req: CreateTodoRequest, userId: number): Promise<TodoResponse> {
    const todo: Todo = Todo.create(req, userId);
    const createdTodo: Todo = await this.todoRepository.create(todo);

    return plainToInstance(TodoResponse, createdTodo);
  }

  async updateTodo(id: number, req: UpdateTodoRequest, userId: number): Promise<TodoResponse> {
    const todo: Todo | null = await this.todoRepository.getByIdWithUser(id);
    if (!todo) {
      throw new NotFoundError('Todo not found.');
    }

    if (todo.user.id !== userId) {
      throw new ForbiddenError('You are not owner of this Todo.');
    }

    todo.title = req.title;
    todo.completed = req.completed;

    const updatedTodo: Todo = await this.todoRepository.update(id, todo);

    return plainToInstance(TodoResponse, updatedTodo);
  }

  async deleteTodo(id: number, userId: number): Promise<void> {
    const todo: Todo | null = await this.todoRepository.getByIdWithUser(id);
    if (!todo) {
      throw new NotFoundError('Todo not found.');
    }

    if (todo.user.id !== userId) {
      throw new ForbiddenError('You are not owner of this Todo.');
    }

    await this.todoRepository.delete(id);
  }

}