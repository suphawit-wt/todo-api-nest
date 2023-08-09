import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { corsConfig } from '@app/common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();