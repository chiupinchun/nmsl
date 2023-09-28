import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTION'],
    credentials: true
  });
  app.use(session({
    secret: 'nmsl',
    rolling: true,
    name: 'token',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));
  await app.listen(3001);
}
bootstrap();
