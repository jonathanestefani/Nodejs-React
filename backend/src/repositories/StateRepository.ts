import { AbstractRepository } from "../abstract/AbstractRepository";
import { State } from "../models/Models";

export class StateRepository extends AbstractRepository {
    protected model: any = State;
}