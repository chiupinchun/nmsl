import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TestController);
  }
}
