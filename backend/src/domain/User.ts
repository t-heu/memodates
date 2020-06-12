import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany} from "typeorm";
import * as bcrypt from 'bcryptjs'

import { Birthday } from "./Birthday";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  yourBirthday: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()//({nullable:true})
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  hasPassword: boolean;

  @Column()
  hasFacebook: boolean;

  @OneToMany(type => Birthday, birthday => birthday.provider)
  birthday: Birthday[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const hash = await bcrypt.hash(this.password, 8)
    this.password = hash
  }
}
