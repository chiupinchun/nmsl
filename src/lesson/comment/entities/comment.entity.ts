import { Lesson } from "src/lesson/entities/lesson.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";

@Entity('lesson-comment')
export class Comment {
  constructor(data: CreateCommentDto) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Lesson, lesson => lesson.comments)
  lesson: Lesson;

  @ManyToOne(() => User)
  user: User;

  // @ManyToMany(() => User)
  // @JoinTable()
  // tags: User[];

  @Column({ length: 1000 })
  content: string;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
