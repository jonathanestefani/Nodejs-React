import { AbstractUseCaseGet } from '../../abstract/AbstractUseCaseGet';
import { IRepository, StringLike, TFilter } from '../../depencies';

export class GetRuralProducerUseCase extends AbstractUseCaseGet {
    protected repository: IRepository = this.repository;
    protected relations: string[] = ["crops"];
    protected filters: TFilter = {
        "inscrition": new StringLike("inscrition"),
        "producer_name": new StringLike("producer_name"),
        "farm_name": new StringLike("farm_name"),
    };
}