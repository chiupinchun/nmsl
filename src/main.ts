import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './global/response';
import { ErrorHandler } from './global/onerror';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images'
  });
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
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(3001);
}
bootstrap();
