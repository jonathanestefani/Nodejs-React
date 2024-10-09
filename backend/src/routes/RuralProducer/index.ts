import { Router } from 'express';
import { asyncHandler } from '../../../src/depencies';
import {
  getRuralProducer,
  createRuralProducer,
  updateRuralProducer,
  deleteRuralProducer,
  getByIdRuralProducer
} from '../../controllers/RuralProducerController';

const RuralProducerRouter = Router();

RuralProducerRouter.get('/',
  asyncHandler(getRuralProducer)
);
RuralProducerRouter.get('/:ruralProducerId(\\d+)',
  asyncHandler(getByIdRuralProducer)
);
RuralProducerRouter.post(
  '/',
  asyncHandler(createRuralProducer),
);
RuralProducerRouter.put(
  '/:ruralProducerId(\\d+)',
  asyncHandler(updateRuralProducer),
);
RuralProducerRouter.delete(
  '/:ruralProducerId(\\d+)',
  asyncHandler(deleteRuralProducer),
);

export default RuralProducerRouter;
