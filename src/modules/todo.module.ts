import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from '@app/controllers';
import { TodoService } from '@app/services';
import { TodoRepository } from '@app/repositories';
import { Todo } from '@app/entities';
import { JwtStrategy } from '@app/common/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodoService, TodoRepository, JwtStrategy],
})

export class TodoModule { }