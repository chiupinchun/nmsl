
import { Length } from "class-validator";
import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCommentDto {
  user: CreateUserDto;

  lesson: CreateLessonDto;

  @Length(1, 1000, { message: '內文應為1-1000字' })
  content: string;
}
