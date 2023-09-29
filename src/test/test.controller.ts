import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFile, Query, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ConfigModule } from 'src/config/config.module';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { RoleGuard } from './guard/role.guard';

@UseGuards(RoleGuard)
@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    @Inject('Config') private readonly config: ConfigModule
  ) { }

  @Get('config')
  getConfig() {
    return this.config;
  }

  @Post('img')
  @UseInterceptors(FileInterceptor('img'))
  upload(@UploadedFile() img: File) {
    console.log(img);
    return img.toString();
  }

  @Get('parse-type')
  getParsedType(@Query('num', ParseIntPipe) num: number) {
    return typeof num;
  }

  @SetMetadata('role', ['admin'])
  @Get('role')
  getRole() {

  }

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
