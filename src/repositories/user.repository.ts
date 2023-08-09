import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { IUserRepository } from '@app/common/interfaces/repositories';
import { BaseRepository } from '@app/repositories';
import { User } from '@app/entities';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async getByUsername(username: string): Promise<User | null> {
    const query: FindOneOptions<User> = { where: { username: username } };
    return await this.userRepository.findOne(query);
  }

}