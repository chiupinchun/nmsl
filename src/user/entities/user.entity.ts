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
  id: string;

  @Column({ unique: true, select: false })
  account: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 16 })
  name: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: ['不公開', '男', '女', '其他'] })
  sex: string;

  @Column({ length: 50, default: '' })
  contract: string;

  @Column({ length: 50, default: '' })
  adress: string;

  @Column({ length: 50, default: '' })
  position: string;

  @Column({ length: 50, default: '' })
  field: string;

  @Column({ length: 100, default: '' })
  techs: string;

  @Column({ length: 1000, default: '' })
  description: string;

  @Column({ type: 'bool', default: true })
  checkable: boolean;

  @Column({ type: 'timestamp' })
  createTime: Date;

  @Column({ type: 'int', default: 0, select: false })
  activity: number;

  @Column({ type: 'bool', default: false, select: false })
  testing: boolean;
}
