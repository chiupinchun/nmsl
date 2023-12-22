import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateArticleDto } from "../dto/create-article.dto";
import { Comment } from "../comment/entities/comment.entity";

@Entity()
export class Article {
  constructor(data: CreateArticleDto) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 10000 })
  content: string;

  @Column({ type: 'enum', enum: ['技術', '發問', '徵才', '隨筆'] })
  type: string;

  @Column({ nullable: true, type: 'enum', enum: ['前端', '後端', '全端', '爬蟲', 'AI', '區塊鏈', '算法', '運維', '網安', '測試'] })
  tech: string;

  @Column({ type: 'timestamp' })
  createTime: Date;

  @OneToMany(() => Comment, comment => comment.article)
  comments: Comment[];
}
