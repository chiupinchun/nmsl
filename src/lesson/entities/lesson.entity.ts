import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateLessonDto } from "../dto/create-lesson.dto";

@Entity()
export class Lesson {
  constructor(data: CreateLessonDto) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ comment: '合集' })
  series: string;

  @Column({ comment: '講師' })
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ comment: '影片連結' })
  src: string;

  @Column({ comment: '搜尋用tag' })
  tags: string;

  @Column({ comment: '曝光度', default: 0 })
  views: number;

  @Column({ comment: '點讚數', default: 0 })
  goods: number;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
