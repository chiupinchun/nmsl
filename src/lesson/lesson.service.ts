import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly lesson: Repository<Lesson>
  ) { }

  create(createLessonDto: CreateLessonDto) {
    const data = new Lesson(createLessonDto);
    return this.lesson.save(data);
  }

  async findAll(condition: Record<string, string> = {}) {
    const {
      order,
      page = 1,
      show = 6,
      search,
      ...rawWhere
    } = condition;

    // where
    let where: FindOptionsWhere<Lesson> | FindOptionsWhere<Lesson>[] = rawWhere;
    if (search) {
      const needSearchCols = ['title', 'content', 'tags', 'author'];
      const keywords = search.split(' ');
      where = keywords.reduce((res, keyword) => {
        needSearchCols.forEach(col => {
          res.push({ [col]: Like(`%${keyword}%`), ...rawWhere });
        });
        return res;
      }, []);
    }

    return findAll(this.lesson, where, { relations: { comments: { user: true } }, order, page, show });
  }

  findOne(id: number) {
    return this.lesson.findOne({ where: { id }, relations: { comments: { user: true } } });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lesson.update({ id }, updateLessonDto);
  }

  remove(id: number) {
    return this.lesson.delete({ id });
  }
}
