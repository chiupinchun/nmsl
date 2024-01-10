import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatecalendarDto } from "../dto/create-calendar.dto";
import { User } from "src/user/entities/user.entity";

@Entity()
export class calendar {
  constructor(data: CreatecalendarDto) {
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

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
