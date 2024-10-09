import { AbstractUseCaseGet } from '../../abstract/AbstractUseCaseGet';
import { IRepository } from '../../interfaces/IRepository';
import { StringLike, TFilter } from '../../depencies';

export class getStateUseCase extends AbstractUseCaseGet {
    protected repository: IRepository = this.repository;
    protected filters: TFilter = {
        "name": new StringLike("name"),
    };
}