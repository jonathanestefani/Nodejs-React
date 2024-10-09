import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RuralProducerCrops } from './RuralProducerCrops';

@Entity()
@Unique(['deleted_at'])
export class RuralProducer {
  @PrimaryGeneratedColumn()
  id!: BigInt;

  @Column()
  producer_name!: string;

  @Column()
  inscrition!: string;

  @Column()
  farm_name!: string;

  @Column()
  state_id!: number;

  @Column()
  city_id!: number;

  @OneToMany(() => RuralProducerCrops, (crops) => crops.rural_producer_id)
  crops?: RuralProducerCrops[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
