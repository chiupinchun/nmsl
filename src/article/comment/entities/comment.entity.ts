import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Article } from "src/article/entities/article.entity";
import { User } from "src/user/entities/user.entity";

@Entity('article-comment')
export class Comment {
  constructor(data: CreateCommentDto) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Article, article => article.comments)
  article: Article;

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
