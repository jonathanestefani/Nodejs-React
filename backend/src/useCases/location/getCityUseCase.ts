import { AbstractUseCaseGet } from '../../abstract/AbstractUseCaseGet';
import { IRepository } from '../../interfaces/IRepository';
import { Number, StringLike, TFilter } from '../../depencies';

export class getCityUseCase extends AbstractUseCaseGet {
    protected repository: IRepository = this.repository;
    protected filters: TFilter = {
        "state_id": new Number("state_id"),
        "name": new StringLike("name"),
    };
}