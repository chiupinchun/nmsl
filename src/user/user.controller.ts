import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('會員中心')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
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
  login(@Body() body: Record<'account' | 'password', string>) {
    if (body.account === 'test' && body.password === 'test') {
      return { status: 1 };
    }
    return { status: 0 };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
