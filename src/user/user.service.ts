import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import findAll from 'src/global/find-all';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const data = new User(createUserDto);
    data.password = await bcrypt.hash(createUserDto.password, 10);
    return this.user.save(data).then(res => {
      const { password, ...other } = res;
      return other;
    }).catch(() => {
      throw new BadGatewayException('此組帳號已被註冊');
    });
  }

  findAll(
    condition: Record<string, string> = {}
  ) {
    const {
      page = 1,
      show = 10,
      keyword,
      order = '-activity',
      ...others
    } = condition;

    const searchableCols = ['name', 'sex', 'adress', 'position', 'field', 'techs'];
    const where: FindOptionsWhere<User>[] = [];

    if (keyword || Object.keys(others).length) {
      searchableCols.forEach(col => {
        if (keyword) where.push({ [col]: Like(`%${keyword}%`), checkable: true });
        if (others[col]) where.push({ [col]: Like(`%${others[col]}%`), checkable: true });
      });
    }

    return findAll(
      this.user,
      where.length ? where : { checkable: true },
      { page, show, order }
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
