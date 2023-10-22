import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Inject } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { ArticleService } from '../article.service';
import { UserService } from 'src/user/user.service';

@Controller('article-comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(UserService) private userService: UserService,
    @Inject(ArticleService) private articleService: ArticleService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Auth() userId: string,
    @Body() body: { articleId: number, content: string; }
  ) {
    const { articleId, ...others } = body;
    const [user, article] = await Promise.all([
      this.userService.findOne({ id: userId }),
      this.articleService.findOne(articleId)
    ]);
    return this.commentService.create({ ...others, user, article });
  }

  @Get(':articleId')
  findAll(
    @Param('articleId') articleId: string,
    @Query() query: Record<string, string> = {}
  ) {
    return this.commentService.findAll({
      ...query,
      article: { id: Number(articleId) }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
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
