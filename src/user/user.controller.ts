import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Inject, Res, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Auth } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';

@ApiTags('會員中心')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post()
  @ApiOperation({ summary: '會員註冊' })
  // @ApiParam({ name: 'account', description: '帳號', required: true, type: String })
  // @ApiParam({ name: 'password', description: '密碼' })
  // @ApiParam({ name: 'name', description: '暱稱' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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

    const token = user.id && await this.jwtService.signAsync({ id: user.id });
    if (token) res.cookie('token', token);

    delete user.password;
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserInfo(@Auth() id: string) {
    return this.userService.findOne({ id });
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne() {
    return this.userService.findOne({});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
