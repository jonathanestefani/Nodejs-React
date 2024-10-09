import { IRuralProducer } from "../interfaces/RuralProducer/IRuralProducer";
import { AbstractDto } from "../depencies";
import { Helpers } from "../utils/helper";

export class RuralProducerDTO extends AbstractDto {
  protected data: IRuralProducer;

  constructor(data: IRuralProducer) {
    super(data);
    this.data = data;
  }

  get(): IRuralProducer {
    if (this.data.inscrition) 
      this.data.inscrition = Helpers.removerCaracteresEspeciais(this.data.inscrition ?? '');
    
    return this.data;
  }
}