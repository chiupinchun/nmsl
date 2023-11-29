import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Auth() id: string,
    @Body() createMemoDto: CreateMemoDto
  ) {
    return this.memoService.create({ ...createMemoDto, user: { id } });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Auth() id: string
  ) {
    return this.memoService.findAll({ user: { id } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.update(+id, updateMemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoService.remove(+id);
  }
}
