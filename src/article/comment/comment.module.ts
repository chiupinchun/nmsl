import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../article.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => ArticleModule)],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
