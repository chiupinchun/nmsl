import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounceDto } from './dto/create-announce.dto';
import { UpdateAnnounceDto } from './dto/update-announce.dto';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) { }

  @Post()
  create(@Body() createAnnounceDto: CreateAnnounceDto) {
    return this.announceService.create(createAnnounceDto);
  }

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.announceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnounceDto: UpdateAnnounceDto) {
    return this.announceService.update(+id, updateAnnounceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announceService.remove(+id);
  }
}
