import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../images'),
      filename(req, file, cb) {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`;
        return cb(null, fileName);
      }
    })
  })],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TestController);
  }
}
