import { IBaseRepository } from '@app/common/interfaces/repositories';
import { Todo } from '@app/entities';

export interface ITodoRepository extends IBaseRepository<Todo> {
  getAllByUserId(userId: number): Promise<Todo[]>;
  getByIdWithUser(id: number): Promise<Todo | null>;
}