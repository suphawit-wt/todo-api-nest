import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/repositories';
import { User } from '@app/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserRepository],
    exports: [UserRepository]
})

export class UserModule { }