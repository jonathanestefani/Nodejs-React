import { AbstractDto } from '../../src/depencies';
import { IRuralProducerCrops } from '../interfaces/RuralProducer/IRuralProducerCrops';

export class RuralProducerCropsDTO extends AbstractDto {
  protected data: IRuralProducerCrops;

  constructor(data: IRuralProducerCrops) {
    super(data);
    this.data = data;
  }

  get(): IRuralProducerCrops {
    return this.data;
  }
}