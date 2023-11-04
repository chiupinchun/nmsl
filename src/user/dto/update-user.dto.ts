import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  avatar: string;

  sex: string;

  contract: string;

  adress: string;

  position: string;

  field: string;

  techs: string;

  description: string;

}
