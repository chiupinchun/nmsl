import { Length } from "class-validator";
import { CreateArticleDto } from "src/article/dto/create-article.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCommentDto {
  user: CreateUserDto;

  article: CreateArticleDto;

  @Length(1, 1000, { message: '留言應為1-1000字' })
  content: string;
}
