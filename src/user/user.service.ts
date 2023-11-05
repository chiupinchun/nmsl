import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import findAll from 'src/global/find-all';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const data = new User(createUserDto);
    data.password = await bcrypt.hash(createUserDto.password, 10);
    return this.user.save(data).then(res => {
      const { password, ...other } = res;
      return other;
    });
  }

  findAll(
    condition: Record<string, string> = {}
  ) {
    const {
      page = 1,
      show = 10,
      ...where
    } = condition;

    return findAll(
      this.user,
      { ...where, checkable: true },
      { page, show }
    );
  }

  async findOne(
    where: FindOptionsWhere<User>
  ) {
    return this.user.findOne({
      where
    });
  }

  login(account: string) {
    return this.user.findOne({
      where: {
        account
      },
      select: this.user.metadata.columns.map(col => col.propertyName) as (keyof User)[]
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
