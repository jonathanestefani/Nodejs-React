import 'reflect-metadata';
import connectDatabase from '../config/data-source';
import { ImportIBGE } from '../services/ImportIBGE';
import { getCountryUseCase } from '../useCases/location/getCountryUseCase';
import { CountryRepository } from '../repositories/CountryRepository';

connectDatabase.initialize().then(async () => {
  connectDatabase
    .transaction(async () => {
      try {
        const result: any = await new getCountryUseCase(
          new CountryRepository(),
          {},
        ).execute({ no_pagination: true });

        if (result.data.length == 0) {
          // Cria as rotas padrões
          await ImportIBGE();
        }

        console.log('Seeds executed successfully.');

        process.exit(0);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
      process.exit(0);
    });
});
