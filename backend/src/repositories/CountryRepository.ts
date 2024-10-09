import { AbstractRepository } from "../abstract/AbstractRepository";
import { Country } from "../models/Models";

export class CountryRepository extends AbstractRepository {
    protected model: any = Country;
}