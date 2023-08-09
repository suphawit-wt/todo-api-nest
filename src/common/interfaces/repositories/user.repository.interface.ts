import { IBaseRepository } from '@app/common/interfaces/repositories';
import { User } from '@app/entities';

export interface IUserRepository extends IBaseRepository<User> {
  getByUsername(username: string): Promise<User | null>;
}