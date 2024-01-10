import { Injectable } from '@nestjs/common';
import { CreatecalendarDto } from './dto/create-calendar.dto';
import { UpdatecalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { calendar } from './entities/calendar.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class calendarService {
  constructor(
    @InjectRepository(calendar)
    private readonly calendar: Repository<calendar>
  ) { }

  create(createcalendarDto: CreatecalendarDto) {
    const data = new calendar(createcalendarDto);
    return this.calendar.save(data);
  }

  findAll(where: FindOptionsWhere<calendar> = {}) {
    if (typeof where.user === 'string') where.user = { id: where.user };
    return findAll(this.calendar, where, { relations: { user: true } });
  }

  findOne(id: number) {
    return this.calendar.findOne({ where: { id } });
  }

  update(id: number, updatecalendarDto: UpdatecalendarDto) {
    return this.calendar.update(id, updatecalendarDto);
  }

  remove(id: number) {
    return this.calendar.delete({ id });
  }
}
