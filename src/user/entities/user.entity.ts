import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(
    data: {
      account: string;
      password: string;
      name: string;
    }
  ) {
    Object.assign(this, data);
    this.createTime = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  account: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  createTime: Date;
}
