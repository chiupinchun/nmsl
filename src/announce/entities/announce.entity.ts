import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateAnnounceDto } from "../dto/create-announce.dto";

@Entity()
export class Announce {
  constructor(data: CreateAnnounceDto) {
    Object.assign(this, data);
    this.createTime = this.updateTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 10000 })
  content: string;

  @Column({ type: 'timestamp' })
  updateTime: Date;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
