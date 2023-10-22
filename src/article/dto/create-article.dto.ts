import { Length } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateArticleDto {
  user: CreateUserDto;

  @Length(1, 100, { message: '文章標題應為1-100字' })
  title: string;

  @Length(1, 25, { message: '無效的文章類型' })
  type: string;

  @Length(1, 10000, { message: '文章內容應為1-10000字' })
  content: string;
}
