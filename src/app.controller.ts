import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return 'nmsl';
    // return this.appService.getHello();
  }

  @Post('test')
  post(@Body() body: Record<string, string>) {
    return { code: 200 };
  }
}
