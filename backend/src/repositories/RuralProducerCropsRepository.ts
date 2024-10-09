import { RuralProducerCrops } from "../models/RuralProducerCrops";
import { AbstractRepository } from "../depencies";

export class RuralProducerCropsRepository extends AbstractRepository {
    protected model: any = RuralProducerCrops;
}