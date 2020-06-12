import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Birthday {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column()
  name: string;

  @Column()
  date: string

  @Column()
  provider_id: string;
    
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
}
