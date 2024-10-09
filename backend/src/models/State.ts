import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Region } from './Region';

@Entity()
export class State {
  @PrimaryColumn('bigint')
  id!: BigInt;

  @Column()
  name!: string;

  @Column()
  acronym!: string;

  @Column('bigint')
  region_id!: BigInt;

  /*
  @ManyToOne(() => Region)
  @JoinColumn({ name: 'region_id' })
  region!: Region;
  */

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;
}
