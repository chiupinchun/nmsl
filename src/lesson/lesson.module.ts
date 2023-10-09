import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Comment]), CommentModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService]
})
export class LessonModule { }
