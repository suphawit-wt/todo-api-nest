import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { ITodoRepository } from '@app/common/interfaces/repositories';
import { BaseRepository } from '@app/repositories';
import { Todo } from '@app/entities';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> implements ITodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
    super(todoRepository);
  }

  async getAllByUserId(userId: number): Promise<Todo[]> {
    const query: FindManyOptions<Todo> = { where: { user: { id: userId } } };
    return await this.todoRepository.find(query);
  }

  async getByIdWithUser(id: number): Promise<Todo | null> {
    const query: FindOneOptions<Todo> = { where: { id: id }, relations: ['user'], };
    return await this.todoRepository.findOne(query);
  }

}