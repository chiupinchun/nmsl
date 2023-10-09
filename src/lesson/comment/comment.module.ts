import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { LessonModule } from '../lesson.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => LessonModule)],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
