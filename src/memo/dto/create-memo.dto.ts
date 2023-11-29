import { Length } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateMemoDto {
  user: { id: string; };

  @Length(1, 100, { message: '標題應為1-100字' })
  title: string;

  @Length(1, 10000, { message: '內容應為1-10000字' })
  content: string;

  @Length(1, 25, { message: '無效的類型' })
  type: string;
}
