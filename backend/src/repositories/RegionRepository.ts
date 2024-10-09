import { AbstractRepository } from "../abstract/AbstractRepository";
import { Region } from "../models/Models";

export class RegionRepository extends AbstractRepository {
    protected model: any = Region;
}