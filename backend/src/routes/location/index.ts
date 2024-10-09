import { Router } from 'express';
import { getCountry, getState, getCity } from '../../controllers/LocationController';
import asyncHandler from 'express-async-handler';

const locationRouter = Router();

/**
 * Rota de países
 */
locationRouter.get(
  '/countries',
  asyncHandler(getCountry),
);

/**
 * Rota de estados
 */
locationRouter.get(
  '/states',
  asyncHandler(getState),
);

/**
 * Rota de cidades
 */
locationRouter.get(
  '/cities',
  asyncHandler(getCity),
);

export default locationRouter;
