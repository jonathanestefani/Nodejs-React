import { RuralProducer } from "../models/RuralProducer";
import { AbstractRepository } from "../depencies";

export class RuralProducerRepository extends AbstractRepository {
    protected model: any = RuralProducer;
}