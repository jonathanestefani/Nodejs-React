import { AbstractRepository } from "../abstract/AbstractRepository";
import { City } from "../models/Models";

export class CityRepository extends AbstractRepository {
    protected model: any = City;
}