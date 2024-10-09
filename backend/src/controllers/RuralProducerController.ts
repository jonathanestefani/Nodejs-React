import { Request, Response } from 'express';
import { ErrorCustomization } from '../depencies';

import { RuralProducerRepository } from '../repositories/RuralProducerRepository';
import { RuralProducerDTO } from '../dto/RuralProducer.dto';
import { SendResponse } from './SendResponse';
import { RuralProducer } from '../models/RuralProducer';

import { GetRuralProducerUseCase } from '../useCases/ruralProducer/GetRuralProducerUseCase';
import { CreateRuralProducerUseCase } from '../useCases/ruralProducer/CreateRuralProducerUseCase';
import { UpdateRuralProducerUseCase } from '../useCases/ruralProducer/UpdateRuralProducerUseCase';
import { DeleteRuralProducerUseCase } from '../useCases/ruralProducer/DeleteRuralProducerUseCase';

export const getRuralProducer = async (
  request: Request,
  response: Response,
): Promise<RuralProducer[] | any> => {
  try {
    const data: any = await new GetRuralProducerUseCase(
      new RuralProducerRepository(),
      request.query,
    ).execute();
    return SendResponse(response, data, 200);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const getByIdRuralProducer = async (
  request: Request,
  response: Response,
): Promise<RuralProducer[] | any> => {
  try {
    const id: BigInt = BigInt(request.params.ruralProducerId);
    const data: any = await new GetRuralProducerUseCase(
      new RuralProducerRepository(),
      id,
    ).execute();
    return SendResponse(response, data, 200);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const createRuralProducer = async (
  request: Request,
  response: Response,
): Promise<RuralProducer | any> => {
  try {
    const ruralProducer = await new CreateRuralProducerUseCase(
      new RuralProducerRepository(),
      new RuralProducerDTO({ ...request.body }),
    ).execute();
    return SendResponse(response, ruralProducer, 201);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const updateRuralProducer = async (
  request: Request,
  response: Response,
): Promise<RuralProducer | any> => {
  try {
    const ruralProducer = await new UpdateRuralProducerUseCase(
      new RuralProducerRepository(),
      new RuralProducerDTO({ ...request.body, id: request.params.ruralProducerId }),
    ).execute();
    return SendResponse(response, ruralProducer, 201);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

export const deleteRuralProducer = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    await new DeleteRuralProducerUseCase(
      new RuralProducerRepository(),
      BigInt(request.params.ruralProducerId),
    ).execute();
    return SendResponse(response, [], 204);
  } catch (validation: any) {
    if (validation instanceof ErrorCustomization) {
      return SendResponse(response, validation.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};
