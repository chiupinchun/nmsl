import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFile, Query, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { RoleGuard } from './guard/role.guard';
import { NoticeGateway } from 'src/notice/notice.gateway';
import { Observable } from 'rxjs';

// @UseGuards(RoleGuard)
@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly noticeGateway: NoticeGateway
  ) { }

  @Post('img')
  @UseInterceptors(FileInterceptor('img'))
  upload(@UploadedFile() img: File) {
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

  @Get('ws-announce')
  announce(@Query('message') message: string) {
    this.noticeGateway.announce(message);
    return { message };
  }

  @Get('observable')
  observable() {
    const observable = new Observable(observer => {
      setTimeout(() => {
        console.log(observer);
        observer.next({ msg: 'nmsl' });
      }, 2000);
    });

    const observer = {
      next(data: { msg: string; }) {
        console.log(data);
      }
    };

    observable.subscribe(observer);

    return 123;
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
