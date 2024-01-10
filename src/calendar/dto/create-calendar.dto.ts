import { Length } from "class-validator";

export class CreatecalendarDto {
  user: { id: string; };

  @Length(1, 100, { message: '標題應為1-100字' })
  title: string;

  @Length(1, 10000, { message: '內容應為1-10000字' })
  content: string;

  @Length(1, 50, { message: '無效的日期' })
  date: string;
}
