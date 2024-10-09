import { validateCNPJ, validateCPF } from 'validations-br';
import { AbstractValidations, EMethod, ErrorCustomization, i18n, IRepository, Joi } from '../../../../src/depencies';
import { IRuralProducer } from '../../../interfaces/RuralProducer/IRuralProducer';
import { GetRuralProducerUseCase } from '../GetRuralProducerUseCase';
import { RuralProducer } from '../../../models/RuralProducer';

export class ValidationRequired extends AbstractValidations {
  protected validation: any = {
    producer_name: Joi.string().required().allow().min(3).messages({
      'any.required': i18n.__('validation.min_length', { value: "3" }),
      'string.empty': i18n.__('validation.required'),
      'string.min': i18n.__('validation.min_length', { value: "3" }),
    }),
    farm_name: Joi.string().required().allow().min(3).messages({
      'any.required': i18n.__('validation.min_length', { value: "3" }),
      'string.empty': i18n.__('validation.required'),
      'string.min': i18n.__('validation.min_length', { value: "3" }),
    }),
    inscrition: Joi.string().required().allow().custom(this.validCpfCnpj).messages({
      'any.required': i18n.__('validation.min_length', { value: "11" }),
      'string.empty': i18n.__('validation.required'),
    }),
    state_id: Joi.number().required().messages({
      'number.required': i18n.__('validation.state_required'),
      'number.base': i18n.__('validation.state_required'),
    }),
    city_id: Joi.number().required().messages({
      'number.required': i18n.__('validation.city_required'),
      'number.base': i18n.__('validation.city_required'),
    }),
  };

  public async execute(data: any, repository: any, method: EMethod): Promise<ErrorCustomization | boolean> {
    let messages: any[] = [];

    try {
      await super.execute(data, repository, method);
    } catch(error) {
      if (error instanceof ErrorCustomization) {
        messages = error.errors;
      }
    }

    try {
      await this.inscritionExists(this.data, repository);
    } catch(error) {
      if (error instanceof Error) {
        messages.push({ inscrition: error.message });
      }
    }

    if (messages.length > 0) {
      throw new ErrorCustomization('ValidationRequired', messages);
    }

    return true;
  }

  private validCpfCnpj(cpf_cnpj: string, obj: any) {
    const numero = cpf_cnpj.replace(/\D/g, '');

    if (numero.length !== 11 && numero.length !== 14) {
      throw new Error(i18n.__('validation.invalid_param', { name: "CNPJ/CPF" }));
    }

    if (numero.length === 11 && !validateCPF(numero)) {
      throw new Error(i18n.__('validation.invalid_param', { name: "CPF" }));
    } else if (numero.length === 14 && !validateCNPJ(numero)) {
      throw new Error(i18n.__('validation.invalid_param', { name: "CNPJ" }));
    }

    return { value: cpf_cnpj };
  }

  private async inscritionExists(data: IRuralProducer, repository: IRepository) {
    if (this.method == EMethod.UPDATE && !data.inscrition) return;

    const inscrition = String(data.inscrition).replace(/\D/g, '');

    const query = {
      filters: {
        inscrition: inscrition
      }
    };

    const result: any = await (new GetRuralProducerUseCase( repository, query )).execute({
      pagination: false
    });

    switch (this.method) {
      case EMethod.POST:
        if (result.length > 0) {
          throw new Error(i18n.__('validation.record_exists'));
        }
        break;
      case EMethod.UPDATE:
        if (result.length > 0) {
          result.map((ruralProducer: RuralProducer) => {
            if (ruralProducer.id != data.id) {
              throw new Error(i18n.__('validation.record_exists'));
            }
          })
        }
      break;
    }

    return inscrition;
  }
}