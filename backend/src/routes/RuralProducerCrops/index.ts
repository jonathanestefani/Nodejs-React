import { Router } from 'express';
import { asyncHandler } from '../../depencies';
import {
  getRuralProducerCrops,
  createRuralProducerCrops,
  updateRuralProducerCrops,
  deleteRuralProducerCrops,
  getByIdRuralProducerCrops
} from '../../controllers/RuralProducerCropsController';

const RuralProducerCropsRouter = Router();

RuralProducerCropsRouter.get('/',
  asyncHandler(getRuralProducerCrops)
);
RuralProducerCropsRouter.get('/:ruralProducerCropsId(\\d+)',
  asyncHandler(getByIdRuralProducerCrops)
);
RuralProducerCropsRouter.post(
  '/',
  asyncHandler(createRuralProducerCrops),
);
RuralProducerCropsRouter.put(
  '/:ruralProducerCropsId(\\d+)',
  asyncHandler(updateRuralProducerCrops),
);
RuralProducerCropsRouter.delete(
  '/:ruralProducerCropsId(\\d+)',
  asyncHandler(deleteRuralProducerCrops),
);

export default RuralProducerCropsRouter;
