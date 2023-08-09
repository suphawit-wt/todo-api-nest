import { Module } from '@nestjs/common/decorators';
import { NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@app/common/config';
import { UserModule, AuthModule, TodoModule } from '@app/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}