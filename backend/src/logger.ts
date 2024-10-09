import bunyan from 'bunyan';

// configuração de log
const logger = bunyan.createLogger({
  name: 'log',
  stream: process.stdout,
  level: 'info',
});

export default logger;
