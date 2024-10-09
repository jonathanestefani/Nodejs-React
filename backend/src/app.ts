import express from 'express';

import {
  json,
  cookieParser,
  cors,
  responseTransform,
  errorHandling,
  i18nTreatment,
} from './depencies';
import routes from './routes/index';

// cria aplição express
const app = express();

// adiciona recurso a aplicação
app.use(cors());
app.use(cookieParser());
app.use(i18nTreatment);
app.use(json());
app.use(responseTransform);
app.use('/api/v1', routes);

app.use(errorHandling);

// retorno objeto para ser executado no server
export default app;
