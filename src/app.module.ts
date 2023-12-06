import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LessonModule } from './lesson/lesson.module';
import { NoticeGateway } from './notice/notice.gateway';
import { WishModule } from './wish/wish.module';
import { ArticleModule } from './article/article.module';
import { MemoModule } from './memo/memo.module';
import { AnnounceModule } from './announce/announce.module';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      username: 'root',
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 3306,
      database: 'nmsl',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 3,
      autoLoadEntities: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    UserModule, TestModule, LessonModule, WishModule, ArticleModule, MemoModule, AnnounceModule
  ],
  controllers: [AppController],
  providers: [AppService, NoticeGateway],
})
export class AppModule { }
