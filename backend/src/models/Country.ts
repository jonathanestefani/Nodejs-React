import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Country {
  @PrimaryColumn('bigint')
  id!: BigInt;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;
}
