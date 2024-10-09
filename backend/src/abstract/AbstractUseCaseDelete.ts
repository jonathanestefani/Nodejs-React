import { AbstractDto, EMethod, ErrorCustomization } from '../depencies';
import { IRepository } from '../interfaces/IRepository';
import { AbstractUseCases } from './AbstractUseCases';
import { IRequest } from '../interfaces/IRequest';

export abstract class AbstractUseCaseDelete extends AbstractUseCases {
  protected repository: IRepository = this.repository;

  constructor(repository: IRepository | IRepository, data: Partial<AbstractDto> | BigInt | IRequest) {
    super(repository, data);
    this.method = EMethod.GET;
  }

  public async execute(): Promise<boolean> {
      try {        
          await this.repository.delete(this.data);
      } catch (error: any) {
          throw new ErrorCustomization('ValidationRequired', [{"message": i18n.__('crud.delete_error')}]);
      }

      return true;
  }

}
