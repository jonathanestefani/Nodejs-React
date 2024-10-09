import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { State } from './State';

@Entity()
export class City {
  @PrimaryColumn('bigint')
  id!: BigInt;

  @Column()
  name!: string;

  @Column('bigint')
  state_id!: BigInt;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state!: State;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;
}
