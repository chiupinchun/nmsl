import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateLessonDto {
  @Length(0, 20, { message: '合集標題不得超過20字' })
  series: string;

  @Length(0, 20, { message: '講師姓名不得超過20字' })
  author: string;

  @IsNotEmpty({ message: '標題必填' })
  @Length(1, 20, { message: '標題應為1-20字' })
  title: string;

  @Length(0, 10000, { message: '內文不得超過10000字' })
  content: string;

  @Length(0, 500, { message: '連結不得超過500字' })
  src: string;

  @Length(0, 500, { message: 'tags超出字數限制' })
  tags: string;
}
