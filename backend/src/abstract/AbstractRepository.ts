import { IRepository } from '../interfaces/IRepository';
import { TFilter } from './TFilter';
import { ErrorCustomization } from '../exception/ErrorCustomization';
import { IPagination } from '../interfaces/IPagination';
import { IConfig } from '../interfaces/IConfig';
import connectDatabase from '../config/data-source';

export abstract class AbstractRepository implements IRepository {
  protected model: any;

  protected transaction: any = null;
  protected relations: any[] = [];

  protected builder: any = null;
  protected filters: TFilter = {};

  protected filtersRequest: any[] = [];

  protected pagination: IPagination = {
    page: 1,
    from: 0,
    data: [],
    total: 0,
    last_page: 0,
    per_page: 10,
  };

  public connection: any;

  constructor(connection?: any, transaction?: any) {
    this.setConfig({ transaction, connection });

    return this;
  }

  setConfig(config: IConfig) {
    if (config.transaction) this.transaction = config.transaction;

    if (config.connection) this.connection = config.connection;

    return this;
  }

  getConfig(): IConfig {
    return {
      transaction: this.transaction,
      connection: this.connection,
    };
  }

  public getModel(): any {
    return this.model;
  }

  async repository() {
    const connection = await this.getManager();
    return await connection.getRepository(this.model);
  }

  async getManager(): Promise<any> {
    if (this.connection) {
      return this.connection;
    }

    this.connection = connectDatabase;
    return this.connection;
  }

  async createQueryBuilder(): Promise<any> {
    if (!this.builder) {
      this.builder = await (
        await this.repository()
      ).createQueryBuilder(this.getModel().name);
    }

    return this.builder;
  }

  public setQueryBuilder(builder: any): any {
    const query = builder.getQuery();
    this.builder = builder;
    return this;
  }

  public setFilters(filters: TFilter, filtersRequest: any[]): any {
    this.filters = filters;
    this.filtersRequest = filtersRequest ?? [];
    return this;
  }

  public setPagination(pagination: IPagination): any {
    this.pagination = pagination ?? this.pagination;
    return this;
  }

  public setRelations(relations: any[]): any {
    this.relations = relations;
    return this;
  }

  public async create(obj: Partial<any>): Promise<any> {
    const record = (await this.repository()).create(obj);

    if (this.transaction) {
      return this.transaction.save(record);
    } else return (await this.repository()).save(record);
  }

  public setTransaction(modelManager: any): any {
    this.transaction = modelManager;
    return this;
  }

  public getTransaction(): any {
    return this.transaction;
  }

  private async runFilter(): Promise<ErrorCustomization[] | boolean> {
    let builder = await this.createQueryBuilder();
    let messagesError: ErrorCustomization[] = [];

    await Promise.all(
      Object.keys(this.filtersRequest).map(async (key: any, value: any) => {
        try {
          const classFilter: any = this.filters[key];

          if (classFilter && this.filtersRequest[key] != '') {
            builder = await classFilter.execute(
              builder,
              this.filtersRequest[key],
            );
          }
        } catch (error: any) {
          messagesError.push(error);
        }
      }),
    );

    await this.setQueryBuilder(builder);

    if (messagesError.length > 0) {
      throw new ErrorCustomization(
        '',
        messagesError.flatMap((item) => item.errors),
      );
    }

    return true;
  }

  public async getById(objId: BigInt): Promise<any | null> {
    try {
      const repository = await this.repository();
      return await repository.findOne({
        where: { id: objId },
        relations: this.relations,
      });
    } catch (error) {
      console.log(error);
    }

    return {};
  }

  public async getAll(): Promise<any[] | any> {
    try {
      await this.runFilter();

      const builder = await this.createQueryBuilder();

      if (this.relations.length > 0) {
        builder.setFindOptions({
          relations: this.relations,
          relationLoadStrategy: 'join',
          where: {},
        });
      }

      return await builder.getMany();
    } catch (error) {
      console.log(error);
    }

    return [];
  }

  public async getAllPagination(): Promise<any[] | any> {
    try {
      const page: number = this.pagination.page ?? 1;
      let pageSize: number = this.pagination.per_page ?? 10;

      if (pageSize > 100) pageSize = 10;

      await this.runFilter();

      const builder = await this.createQueryBuilder();

      if (this.relations.length > 0) {
        builder.setFindOptions({
          relations: this.relations,
          relationLoadStrategy: 'join',
          where: {},
        });
      }

      const dados = await builder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();

      // Consulta para obter o total de registros
      const totalRecords = await builder.getCount();

      // Calcula o total de páginas
      const totalPages = Math.ceil(totalRecords / pageSize);
      const from = page - 1;

      return {
        page: page,
        from: from < 0 ? 0 : from,
        data: dados,
        total: totalRecords,
        last_page: totalPages,
        per_page: pageSize,
      };
    } catch (error) {
      console.log(error);
    }

    return [];
  }

  public async update(data: Partial<any>): Promise<any> {
    const recordId = data.id;
    const tenant = await (
      await this.repository()
    ).findOneOrFail({
      where: { id: recordId },
    });

    delete data.id;

    await (await this.repository()).merge(tenant, data);
    return await (await this.repository()).save(tenant);
  }

  public async delete(objId: BigInt): Promise<boolean> {
    const tenant = await (
      await this.repository()
    ).findOneOrFail({
      where: { id: objId },
    });
    await (await this.repository()).softRemove(tenant);
    return true;
  }
}
