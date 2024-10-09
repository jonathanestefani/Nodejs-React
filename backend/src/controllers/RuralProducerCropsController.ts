import { Request, Response } from 'express';
import { ErrorCustomization } from '../depencies';

import { RuralProducerCropsRepository } from '../repositories/RuralProducerCropsRepository';
import { RuralProducerCropsDTO } from '../dto/RuralProducerCrops.dto';
import { SendResponse } from './SendResponse';
import { RuralProducerCrops } from '../models/RuralProducerCrops';

import { GetRuralProducerCropsUseCase } from '../useCases/ruralProducerCrops/GetRuralProducerCropsUseCase';
import { CreateRuralProducerCropsUseCase } from '../useCases/ruralProducerCrops/CreateRuralProducerCropsUseCase';
import { UpdateRuralProducerCropsUseCase } from '../useCases/ruralProducerCrops/UpdateRuralProducerCropsUseCase';
import { DeleteRuralProducerCropsUseCase } from '../useCases/ruralProducerCrops/DeleteRuralProducerCropsUseCase';

export const getRuralProducerCrops = async (
  request: Request,
  response: Response,
): Promise<RuralProducerCrops[] | any> => {
  try {
    const data: any = await new GetRuralProducerCropsUseCase(
      new RuralProducerCropsRepository(),
      request.query,
    ).execute();
    return SendResponse(response, data, 200);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const getByIdRuralProducerCrops = async (
  request: Request,
  response: Response,
): Promise<RuralProducerCrops[] | any> => {
  try {
    const data: any = await new GetRuralProducerCropsUseCase(
      new RuralProducerCropsRepository(),
      BigInt(request.params.ruralProducerCropsId),
    ).execute();
    return SendResponse(response, data, 200);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const createRuralProducerCrops = async (
  request: Request,
  response: Response,
): Promise<RuralProducerCrops | any> => {
  try {
    const ruralProducer = await new CreateRuralProducerCropsUseCase(
      new RuralProducerCropsRepository(),
      new RuralProducerCropsDTO({ ...request.body }),
    ).execute();
    return SendResponse(response, ruralProducer, 201);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const updateRuralProducerCrops = async (
  request: Request,
  response: Response,
): Promise<RuralProducerCrops | any> => {
  try {
    const ruralProducer = await new UpdateRuralProducerCropsUseCase(
      new RuralProducerCropsRepository(),
      new RuralProducerCropsDTO({ ...request.body, id: request.params.ruralProducerCropsId, role_ruralProducer: true }),
    ).execute();
    return SendResponse(response, ruralProducer, 201);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const deleteRuralProducerCrops = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    await new DeleteRuralProducerCropsUseCase(
      new RuralProducerCropsRepository(),
      BigInt(request.params.ruralProducerCropsId),
    ).execute();
    return SendResponse(response, [], 204);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};
