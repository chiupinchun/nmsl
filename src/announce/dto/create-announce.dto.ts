import { Length } from "class-validator";

export class CreateAnnounceDto {
  @Length(1, 100, { message: '文章標題應為1-100字' })
  title: string;

  @Length(1, 10000, { message: '文章內容應為1-10000字' })
  content: string;
}
