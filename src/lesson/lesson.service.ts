import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly lesson: Repository<Lesson>
  ) { }

  create(createLessonDto: CreateLessonDto) {
    const data = new Lesson(createLessonDto);
    return this.lesson.save(data);
  }

  findAll(where: Record<string, string> = {}) {
    return this.lesson.find({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lesson.update({ id }, updateLessonDto);
  }

  remove(id: number) {
    return this.lesson.delete({ id });
  }
}
