import { Repository, ObjectLiteral, DeleteResult } from 'typeorm';
import { IBaseRepository } from '@app/common/interfaces/repositories';
import { handleException } from '@app/common/utils';

export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  constructor(
    private readonly repository: Repository<T>
  ) { }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.findOne({ where: { id: id } } as any);
  }

  async create(entity: T): Promise<T> {
    try {
      return await this.repository.save(entity);
    }
    catch (error) {
      handleException(error);
    }
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    const currentEntity = await this.getById(id);
    Object.assign(currentEntity, entity);

    try {
      return await this.repository.save(currentEntity);
    }
    catch (error) {
      handleException(error);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

}