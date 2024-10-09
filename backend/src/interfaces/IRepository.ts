import { IConfig } from './IConfig';
import { TFilter } from '../abstract/TFilter';
import { IPagination } from './IPagination';

export interface IRepository {
  connection: any;

  setConfig(config: IConfig): void;
  getConfig(): IConfig;

  repository(): Promise<any>;
  getModel(): any;

  getById(objId: BigInt): Promise<any | null>;
  getAll(): Promise<any[]>;
  getAllPagination(): Promise<any[]>;

  create(obj: any): Promise<any>;
  update(data: any): Promise<any>;
  delete(objId: BigInt): Promise<boolean>;

  getTransaction(): any;
  setTransaction(modelManager: any): any;

  createQueryBuilder(): Promise<any>;
  setQueryBuilder(builder: any): any;

  setRelations(relations: any[]): any;
  setFilters(filters: TFilter, requestFilters: any[]): any;
  setPagination(pagination: IPagination): any;

  getManager(): Promise<any>;
}
