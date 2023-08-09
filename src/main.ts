import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import { corsConfig, swaggerConfig } from '@app/common/config';
import { CustomValidationPipe } from '@app/common/pipes';
import { AppExceptionFilter } from '@app/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AppExceptionFilter());
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(3000);
}

bootstrap();