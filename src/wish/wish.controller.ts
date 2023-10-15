import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { UserService } from 'src/user/user.service';

@Controller('wish')
export class WishController {
  constructor(
    private readonly wishService: WishService,
    @Inject(UserService) private userService: UserService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Auth() userId: string,
    @Body() body: { wish: string; }
  ) {
    const user = await this.userService.findOne({ id: userId });
    return this.wishService.create({ ...body, user });
  }

  @Get()
  findAll() {
    return this.wishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishService.update(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishService.remove(+id);
  }
}
