import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './entities/memo.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memo: Repository<Memo>
  ) { }

  create(createMemoDto: CreateMemoDto) {
    const data = new Memo(createMemoDto);
    return this.memo.save(data);
  }

  findAll(where: FindOptionsWhere<Memo> = {}) {
    if (typeof where.user === 'string') where.user = { id: where.user };
    return findAll(this.memo, where, { relations: { user: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} memo`;
  }

  update(id: number, updateMemoDto: UpdateMemoDto) {
    return this.memo.update(id, updateMemoDto);
  }

  remove(id: number) {
    return this.memo.delete({ id });
  }
}
