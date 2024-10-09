import 'reflect-metadata';
import app from './app';
import connectDatabase from './config/data-source';
import logger from './logger';

const PORT = process.env.PORT || 3000;

// inicia a aplicação
connectDatabase.initialize().then(() => {
  app.listen(PORT, () => {
    logger.warn(`Server is running on port ${PORT}`);
  });
});
