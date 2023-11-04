import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(condition: Record<string, string>) {
    return this.user.findOne({
      where: condition
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
