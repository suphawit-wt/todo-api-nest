import { CreateTodoRequest, UpdateTodoRequest } from '@app/common/dto/request';
import { TodoResponse } from '@app/common/dto/response';

export interface ITodoService {
  getTodos(userId: number): Promise<TodoResponse[]>;
  getTodo(id: number, userId: number): Promise<TodoResponse>;
  createTodo(req: CreateTodoRequest, userId: number): Promise<TodoResponse>;
  updateTodo(id: number, req: UpdateTodoRequest, userId: number): Promise<TodoResponse>;
  deleteTodo(id: number, userId: number): Promise<void>;
}