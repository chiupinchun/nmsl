import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>
  ) { }

  create(createCommentDto: CreateCommentDto) {
    const data = new Comment(createCommentDto);
    return this.comment.save(data);
  }

  async findAll(id: number) {
    const [dataList, totalRecord] = await this.comment.findAndCount({
      where: {
        lesson: { id }
      },
      relations: {
        user: true,
        lesson: true
      }
    });

    return { dataList, totalRecord, totalPage: 1 };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
