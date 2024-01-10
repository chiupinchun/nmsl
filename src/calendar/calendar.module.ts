import { Module } from '@nestjs/common';
import { calendarService } from './calendar.service';
import { calendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { calendar } from './entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([calendar])],
  controllers: [calendarController],
  providers: [calendarService],
})
export class CalendarModule { }
