import { AbstractUseCaseGet } from "../../abstract/AbstractUseCaseGet";
import { IRepository, Number, StringLike, TFilter } from "../../depencies";

export class GetRuralProducerCropsUseCase extends AbstractUseCaseGet {
    protected repository: IRepository = this.repository;
    protected filters: TFilter = {
        "rural_producer_id": new Number("rural_producer_id"),
        "type": new StringLike("type"),
   };
}