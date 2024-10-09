const { decode } = require('html-entities');
import { IErrorCustomization } from '../interfaces/IErrorCustomization';
import { ErrorCustomization } from '../exception/ErrorCustomization';
import { IValidations } from '../interfaces/IValidations';
import { EMethod, Joi } from '../depencies';

export abstract class AbstractValidations implements IValidations {
  protected validation: any = {};
  public messages: IErrorCustomization[] = [];
  public data: any;
  public repository: any;
  public method: EMethod = EMethod.UNDEFINED;
  private schema: any;

  public async execute(
    data: Object,
    repository: any,
    method?: EMethod
  ): Promise<ErrorCustomization | boolean> {
    this.data = data;
    this.repository = repository;
    this.method = method ?? EMethod.UNDEFINED;

    if (data) {
      const valid = await this.extractData(data);

      this.schema = Joi.object(this.validation).options({ abortEarly: false });

      const validation = await this.schema.validate(valid, {
        context: this.data,
        repository: this.repository,
      });

      if (validation.error) {
        if (process.env.DEBUG == 'true') {
          console.log('Erros => ', validation.error);
        }

        const messages = validation.error.details.flatMap((item: any) => [
          {
            [item.context.key]:
              item.type == 'any.custom'
                ? decode(item.context.error.message)
                : item.message,
          },
        ]);

        this.messages.push(messages);
      }
    }

    if (this.messages.length > 0) {
      throw new ErrorCustomization(
        'ValidationRequired',
        this.messages.flatMap((item: any) => item),
      );
    }

    return true;
  }

  private async extractData(data: any): Promise<any> {
    let newData: any = {};

    await Promise.all(
      Object.keys(this.validation).map((key: any) => {
        if (this.method == EMethod.UPDATE) {
          if (data.hasOwnProperty(key)) {
            newData[key] = data[key];
          } else {
            delete this.validation[key];
          }
        } else newData[key] = data[key];
      }),
    );

    this.schema = Joi.object(this.validation).options({ abortEarly: false });

    return await Object(newData);
  }
}
