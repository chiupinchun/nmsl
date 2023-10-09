import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Inject } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { UserService } from 'src/user/user.service';
import { LessonService } from '../lesson.service';

@Controller('lesson-comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(UserService) private userService: UserService,
    @Inject(LessonService) private lessonService: LessonService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Auth() userId: string,
    @Body() body: { lessonId: number, content: string; }
  ) {
    const { lessonId, ...others } = body;
    const [user, lesson] = await Promise.all([
      this.userService.findOne({ id: userId }),
      this.lessonService.findOne(body.lessonId)
    ]);
    return this.commentService.create({ ...others, user, lesson });
  }

  @Get(':lessonId')
  async findAll(
    @Param('lessonId') lessonId: string,
    @Query() query: Record<string, string> = {}
  ) {
    return this.commentService.findAll({
      ...query,
      lesson: { id: Number(lessonId) }
    });
  }

  @Get(':lessonId/:commentId')
  findOne(@Param('commentId') commentId: string) {
    return this.commentService.findOne(+commentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
