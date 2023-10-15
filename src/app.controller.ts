import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return 'https://drive.google.com/drive/u/0/folders/1i55wJq6qVYZ6280EyOW8N6EqZrr_EZSb';
    return this.appService.getHello();
  }

  @Post('test')
  post(@Body() body: Record<string, string>) {
    return { code: 200 };
  }
}
