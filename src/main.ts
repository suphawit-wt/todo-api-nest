import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { corsConfig } from '@app/common/config';
import { CustomValidationPipe } from '@app/common/pipes';
import { AppExceptionFilter } from '@app/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AppExceptionFilter());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();