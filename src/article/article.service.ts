import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>
  ) { }

  create(createArticleDto: CreateArticleDto) {
    const data = new Article(createArticleDto);
    return this.article.save(data);
  }

  findAll(condition: FindOptionsWhere<Article> & Record<string, string> = {}) {
    const { page = '1', show = '10', ...where } = condition;
    if (typeof where.user === 'string') where.user = { id: where.user };
    return findAll(this.article, where, { relations: { user: true, comments: { user: true } }, order: '-createTime', page, show });
  }

  findOne(id: number) {
    return this.article.findOne({ where: { id }, relations: { user: true, comments: { user: true } } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.article.update({ id }, updateArticleDto);
  }

  remove(id: number) {
    return this.article.delete({ id });
  }
}
