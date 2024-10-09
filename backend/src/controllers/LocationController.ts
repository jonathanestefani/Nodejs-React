import { Request, Response } from 'express';

import { City, Country, State } from '../models/Models';

import { CountryRepository } from '../repositories/CountryRepository';
import { StateRepository } from '../repositories/StateRepository';
import { CityRepository } from '../repositories/CityRepository';

import { getCityUseCase } from '../useCases/location/getCityUseCase';
import { getStateUseCase } from '../useCases/location/getStateUseCase';
import { getCountryUseCase } from '../useCases/location/getCountryUseCase';

import { ErrorCustomization } from '../exception/ErrorCustomization';
import { SendResponse } from './SendResponse';

/**
 * Retorna a lista de países cadastradas.
 */
export const getCountry = async (request: Request, response: Response): Promise<Country[] | any> => {
  try {
    const data: any = await new getCountryUseCase(
      new CountryRepository(),
      request.query,
    ).execute({ pagination: false });
    return SendResponse(response, data, 200);
  } catch (th: any) {
    if (th instanceof ErrorCustomization) {
      return SendResponse(response, th.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

/**
 * Retorna a lista de estados cadastradas.
 */
export const getState = async (request: Request, response: Response): Promise<State[] | any> => {
  try {
    const data: any = await new getStateUseCase(
      new StateRepository(),
      request.query,
    ).execute({ pagination: false });
    return SendResponse(response, data, 200);
  } catch (th: any) {
    if (th instanceof ErrorCustomization) {
      return SendResponse(response, th.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};

/**
 * Retorna a lista de cidades cadastradas.
 */
export const getCity = async (request: Request, response: Response): Promise<City[] | any> => {
  try {
    const data: any = await new getCityUseCase(
      new CityRepository(),
      request.query,
    ).execute({ pagination: false });
    return SendResponse(response, data, 200);
  } catch (th: any) {
    if (th instanceof ErrorCustomization) {
      return SendResponse(response, th.getMessages(), 422);
    } else return SendResponse(response, [], 422);
  }
};