import { Router } from 'express';
import locationRouter from './location';
import RuralProducerRouter from './RuralProducer';
import RuralProducerCropsRouter from './RuralProducerCrops';

const routes = Router();

routes.get('/', (_req, res) => {
  res.send('Bem-vindo ao projeto de produtor rural');
});
routes.use('/locations', locationRouter);
routes.use('/rural-producers', RuralProducerRouter);
routes.use('/rural-producers-crops', RuralProducerCropsRouter);

export default routes;
