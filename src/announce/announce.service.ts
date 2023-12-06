import { Injectable } from '@nestjs/common';
import { CreateAnnounceDto } from './dto/create-announce.dto';
import { UpdateAnnounceDto } from './dto/update-announce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announce } from './entities/announce.entity';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announce: Repository<Announce>
  ) { }

  create(createAnnounceDto: CreateAnnounceDto) {
    const data = new Announce(createAnnounceDto);
    return this.announce.save(data);
  }

  findAll(condition: FindOptionsWhere<Announce> & Record<string, string> = {}) {
    const { page = '1', show = '5', ...where } = condition;
    return findAll(this.announce, where, { order: '-updateTime', page, show });
  }

  findOne(id: number) {
    return `This action returns a #${id} announce`;
  }

  update(id: number, updateAnnounceDto: UpdateAnnounceDto) {
    return this.announce.update({ id }, { ...updateAnnounceDto, updateTime: new Date() });
  }

  remove(id: number) {
    return this.announce.delete({ id });
  }
}
