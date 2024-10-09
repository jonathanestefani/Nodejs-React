import { AbstractValidations, EMethod, ErrorCustomization, i18n, IRepository, Joi } from "../../../depencies";
import { GetRuralProducerCropsUseCase } from "../GetRuralProducerCropsUseCase";
import { RuralProducerCrops } from "../../../models/Models";
import { IRuralProducerCrops } from "src/interfaces/RuralProducer/IRuralProducerCrops";

export class ValidationRequiredCrops extends AbstractValidations {
  protected validation: any = {
    rural_producer_id: Joi.number().positive().required().messages({
      'number.min': i18n.__('validation.min_length', { value: "3" }),
      'any.required': i18n.__('validation.required', { value: "3" }),
    }),
    type: Joi.string().required().min(3).messages({
      'string.min': i18n.__('validation.min_length', { value: "3" }),
      'any.required': i18n.__('validation.required'),
      'string.empty': i18n.__('validation.required'),
    }),
    total_area: Joi.number().required().messages({
      'any.required': i18n.__('validation.required'),
      'number.required': i18n.__('validation.required'),
      'number.base': i18n.__('validation.state_required'),
    }),
    agricultural_area_hectares: Joi.number().required().messages({
      'any.required': i18n.__('validation.required'),
      'number.required': i18n.__('validation.required'),
      'number.base': i18n.__('validation.state_required'),
    }),
    vegetation_area_hectares: Joi.number().required().messages({
      'any.required': i18n.__('validation.required'),
      'number.required': i18n.__('validation.required'),
      'number.base': i18n.__('validation.state_required'),
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
      await this.validTotalArea(this.data, repository);
    } catch(error) {
      if (error instanceof Error) {
        messages.push({ inscrition: error.message });
      }
    }

    try {
      await this.typeExists(this.data, repository);
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

  private async validTotalArea(data: IRuralProducerCrops, repository: IRepository) {
    if (data.agricultural_area_hectares + data.vegetation_area_hectares > data.total_area) {
        throw new Error(i18n.__('validation.area_total'));
    }

    return data.total_area;
  }

  private async typeExists(data: IRuralProducerCrops, repository: IRepository) {
    if (this.method == EMethod.UPDATE && !data.type) return;

    const rural_producer_id = Number(data.rural_producer_id);
    const type = data.type

    const query = {
      filters: {
        rural_producer_id: rural_producer_id,
        type: type
      }
    };

    const result: any = await (new GetRuralProducerCropsUseCase( repository, query )).execute({
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
          result.map((ruralProducer: RuralProducerCrops) => {
            if (ruralProducer.id != data.id) {
              throw new Error(i18n.__('validation.record_exists'));
            }
          })
        }
      break;
    }

    return type;
  }
}