const Joi = require('joi');

import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import asyncHandler from 'express-async-handler';
import { responseTransform } from './middleware/responseTransform';
import errorHandling from './middleware/errorHandling';
import i18nTreatment from './middleware/i18nTreatment';
import i18n from './i18n';

import { ErrorCustomization } from './exception/ErrorCustomization';
import { AbstractDto } from './abstract/AbstractDto';
import { AbstractValidations } from './abstract/AbstractValidations';
import { EMethod } from './enum/EMethod';
import { AbstractRepository } from './abstract/AbstractRepository';
import { AbstractUseCases } from './abstract/AbstractUseCases';
import { TFilter } from './abstract/TFilter';
import { Boolean } from './filters/Boolean';
import { DateRange } from './filters/DateRange';
import { Number } from './filters/Number';
import { String } from './filters/String';
import { StringLike } from './filters/StringLike';
import { IErrorCustomization } from './interfaces/IErrorCustomization';
import { IRepository } from './interfaces/IRepository';
import { IValidations } from './interfaces/IValidations';

export {
  Joi,
  json,
  i18nTreatment,
  i18n,
  cookieParser,
  cors,
  responseTransform,
  errorHandling,
  asyncHandler,
  ErrorCustomization,
  AbstractDto,
  AbstractValidations,
  AbstractRepository,
  TFilter,
  AbstractUseCases,
  Boolean,
  DateRange,
  Number,
  String,
  StringLike,
  IErrorCustomization,
  IRepository,
  IValidations,
  EMethod
};
