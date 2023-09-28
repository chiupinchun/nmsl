import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ path: '' }), TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
