import { execSync } from 'child_process';
import logger from './logger';

// executa migrations para um tenant
async function runMigration() {
  const output = (process.argv[3] || '') + '/';
  const file = process.argv[2];
  const prefix = `npx typeorm migration:create ./src/migrations/${output}/${file}`;

  try {
    const respose = execSync(`${prefix}`, { stdio: 'inherit' });
    logger.warn(respose);
    process.exit(0);
  } catch (error) {
    logger.error(`Erro durante a execução da criação da migration`, error);
    process.exit(1);
  }
}

runMigration();
