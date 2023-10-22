import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { UserService } from 'src/user/user.service';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    @Inject(UserService) private userService: UserService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Auth() userId: string,
    @Body() body: {
      title: string;
      type: string;
      content: string;
    }
  ) {
    const user = await this.userService.findOne({ id: userId });
    return this.articleService.create({ ...body, user });
  }

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
