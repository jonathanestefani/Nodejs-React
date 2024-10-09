import { AbstractDto, EMethod } from '../depencies';
import { IRepository } from '../interfaces/IRepository';
import { AbstractUseCases } from './AbstractUseCases';
import { TFilter } from './TFilter';
import { IRequest } from '../interfaces/IRequest';

export abstract class AbstractUseCaseGet extends AbstractUseCases {
  protected repository: IRepository = this.repository;
  protected filters: TFilter = {};

  constructor(repository: IRepository | IRepository, data: Partial<AbstractDto> | BigInt | IRequest) {
    super(repository, data);
    this.method = EMethod.GET;
  }

  public async execute(params: any = {}): Promise<any[]> {
      if (typeof(this.data) == "bigint") {
          return await this.repository.setRelations(this.relations).getById(this.data);
      }

      if (params.hasOwnProperty('pagination') && params.pagination == false) {
        return await this.repository
            .setFilters(this.filters, this.data.filters)
            .getAll();
      }

      return await this.repository
      .setFilters(this.filters, this.data.filters)
      .setPagination(this.data.pagination)
      .getAllPagination();
  }

}
