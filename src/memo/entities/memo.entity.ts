import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateMemoDto } from "../dto/create-memo.dto";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Memo {
  constructor(data: CreateMemoDto) {
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

  @Column({ type: 'enum', enum: ['todo', 'doing', 'done'] })
  type: string;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
