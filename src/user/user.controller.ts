import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Inject, Res, UnauthorizedException, Req, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Auth } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@ApiTags('會員中心')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post()
  @ApiOperation({ summary: '會員註冊' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.userService.create(createUserDto);

    const token = user.id && await this.jwtService.signAsync({ id: user.id, account: user.account });
    if (token) res.cookie('token', token);

    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '會員登入' })
  @ApiParam({ name: 'account', description: '帳號' })
  @ApiParam({ name: 'password', description: '密碼' })
  // @HttpCode(200)
  async login(
    @Body('account') account: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.userService.login(account);

    if (!(user && await bcrypt.compare(password, user.password))) throw new UnauthorizedException({ message: '帳號或密碼錯誤。' });

    const token = user.id && await this.jwtService.signAsync({ id: user.id, account: user.account });
    if (token) res.cookie('token', token);

    delete user.password;
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserInfo(@Auth() id: string) {
    return this.userService.findOne({ id });
  }

  @Get('all')
  findAll(@Query() condition: Record<string, string>) {
    return this.userService.findAll(condition);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) throw new HttpException('不存在的使用者。', HttpStatus.NOT_FOUND);
    if (!user.checkable) throw new HttpException('該使用者已關閉履歷。', HttpStatus.FORBIDDEN);
    return user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(
    @Auth() id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    if (updateUserDto.avatar) updateUserDto.avatar = updateUserDto.avatar.replace('<', '');

    // 不可更改
    delete updateUserDto.account;
    delete updateUserDto.password;

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
