import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Region {
  @PrimaryColumn('bigint')
  id!: BigInt;

  @Column()
  name!: string;

  @Column()
  acronym!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;
}
