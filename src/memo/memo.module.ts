import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/memo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule { }
