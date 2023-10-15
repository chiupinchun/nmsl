import { Length } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateWishDto {
  user: CreateUserDto;

  @Length(1, 50, { message: '願望應為1-1000字' })
  wish: string;
}
