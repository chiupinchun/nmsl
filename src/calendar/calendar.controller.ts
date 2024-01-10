import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { calendarService } from './calendar.service';
import { CreatecalendarDto } from './dto/create-calendar.dto';
import { UpdatecalendarDto } from './dto/update-calendar.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('calendar')
export class calendarController {
  constructor(private readonly calendarService: calendarService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Auth() id: string,
    @Body() createcalendarDto: CreatecalendarDto
  ) {
    return this.calendarService.create({ ...createcalendarDto, user: { id } });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Auth() id: string
  ) {
    return this.calendarService.findAll({ user: { id } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecalendarDto: UpdatecalendarDto) {
    return this.calendarService.update(+id, updatecalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id);
  }
}
