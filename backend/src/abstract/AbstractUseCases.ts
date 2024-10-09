import { IRepository } from '../interfaces/IRepository';
import { ErrorCustomization } from '../exception/ErrorCustomization';
import { IValidations } from '../interfaces/IValidations';
import { TFilter } from './TFilter';
import { AbstractDto } from './AbstractDto';
import { IRequest } from '../interfaces/IRequest';
import { EMethod } from '../enum/EMethod';

export abstract class AbstractUseCases {
  protected repository: IRepository | IRepository;
  protected validations: IValidations[] = [];
  protected filters: TFilter = {};
  protected relations: string[] = [];
  protected data: any;
  protected messagesError: ErrorCustomization[] = [];
  protected method?: EMethod = EMethod.UNDEFINED;

  constructor(
    repository: IRepository | IRepository,
    data: Partial<AbstractDto> | BigInt | IRequest
  ) {
    this.repository = repository;
    this.data = data instanceof AbstractDto ? data.get() : data;
  }

  protected async execute(params: any = {}): Promise<any> {
    await this.validation();

    return [];
  }

  protected async validation(): Promise<ErrorCustomization[] | boolean> {
    await Promise.all(
      this.validations.map(async (validation: IValidations | any) => {
        try {
          await validation.execute(this.data, this.repository, this.method);
        } catch (error: any) {
          this.messagesError.push(error);
        }
      }),
    );

    if (this.messagesError.length > 0) {
      throw new ErrorCustomization(
        '',
        this.messagesError.flatMap((item) => item.errors),
      );
    }

    return true;
  }
}
