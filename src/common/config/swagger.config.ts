import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Todo API NestJS')
  .setDescription('This is CRUD Todo API project using NestJS, MySQL, TypeORM, Jest, ESLint, Docker, JWT and Swagger')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();