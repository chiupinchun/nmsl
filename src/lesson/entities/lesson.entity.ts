import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { Comment } from "../comment/entities/comment.entity";

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

  @Column({ length: 100 })
  title: string;

  @Column({ length: 10000 })
  content: string;

  @Column({ comment: '影片連結', nullable: true })
  src: string;

  @Column({ comment: '搜尋用tag' })
  tags: string;

  @Column({ comment: '權重，最高的幾項會被增加曝光', default: 0 })
  weight: number;

  @Column({ comment: '曝光度', default: 0 })
  views: number;

  @Column({ comment: '點讚數', default: 0 })
  goods: number;

  @Column({ type: 'timestamp' })
  createTime: Date;

  @OneToMany(() => Comment, comment => comment.lesson)
  comments: Comment[];
}
