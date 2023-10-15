import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { CreateWishDto } from "../dto/create-wish.dto";

@Entity()
export class Wish {
  constructor(data: CreateWishDto) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 50 })
  wish: string;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
