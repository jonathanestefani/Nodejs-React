import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { RuralProducer } from './RuralProducer';

@Entity()
@Unique(['deleted_at'])
export class RuralProducerCrops {
  @PrimaryGeneratedColumn()
  id!: BigInt;

  @Column('bigint')
  rural_producer_id!: BigInt;

  @Column()
  type!: string;

  @Column()
  total_area!: Number;

  @Column()
  agricultural_area_hectares!: number;

  @Column()
  vegetation_area_hectares!: number;

  @ManyToOne(() => RuralProducer, (ruralProducer) => ruralProducer.crops)
  @JoinColumn({ name: 'rural_producer_id' })
  rural_producer?: RuralProducer;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
