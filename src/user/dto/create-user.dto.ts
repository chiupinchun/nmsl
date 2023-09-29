import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: '帳號必填' })
  @Length(8, 20, { message: '帳號應為8-20字' })
  account: string;

  @IsNotEmpty({ message: '密碼必填' })
  @Length(8, 20, { message: '密碼應為8-20字' })
  password: string;

  @IsNotEmpty({ message: '暱稱必填' })
  @Length(1, 20, { message: '暱稱應為1-20字' })
  name: string;
}
