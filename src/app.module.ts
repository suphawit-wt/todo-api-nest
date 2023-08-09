import { Module } from '@nestjs/common/decorators';
import { NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces';

@Module({
  imports: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}