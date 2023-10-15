import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import findAll from 'src/global/find-all';

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish) private readonly wish: Repository<Wish>
  ) { }

  create(createWishDto: CreateWishDto) {
    const data = new Wish(createWishDto);
    return this.wish.save(data);
  }

  findAll(condition: Record<string, string> = {}) {
    const { page = 1, show, search = '' } = condition;
    try {
      return this.wish
        .createQueryBuilder('wish')
        .select('wish.wish', 'wish')
        .addSelect('COUNT(wish.id)', 'count')
        .where('wish.wish LIKE :search', { search: `%${search}%` })
        .groupBy('wish.wish')
        .orderBy('count', 'DESC')
        .take(isNaN(+show) ? 9999999 : +show)
        .skip(isNaN(+show) ? 0 : ((+page - 1) * +show))
        .getRawMany();
    } catch (err) {
      console.log(err);
      return { status: 0 };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }
}
