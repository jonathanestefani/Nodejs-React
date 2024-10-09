import connectDatabase from '../config/data-source';
import { connectDatabaseIniciatize } from '../config/database';
import { Ibge } from './ibge';
import { Country } from '../models/Country';
import { Region } from '../models/Region';
import { State } from '../models/State';
import { City } from '../models/City';

/**
 * Importa localidades IBGE
 */
export const ImportIBGE = async () => {
  try {
    await connectDatabaseIniciatize();
  } catch (error) {}

  await importCountries();
  await importRegions();
  const states = await importStates();
  await importCities(states);

  console.log('--- Importação feita com sucesso ---');
  process.exit(0);
};

const importCountries = async () => {
  console.log('--- Importando Países ---');

  var countries = await new Ibge().getCountries();

  await Promise.all(
    countries.map(async (data: any) => {
      const countryRepository = connectDatabase.getRepository(Country);

      const info = {
        id: data.id.M49,
        name: data.nome,
      };

      let country: any = await countryRepository.findOneBy({
        id: data.id.M49,
      });

      if (country) {
        delete info.id;
        countryRepository.merge(country, info);
      } else {
        country = countryRepository.create(info);
      }

      await countryRepository.save(country);
    }),
  );
};

const importRegions = async () => {
  console.log('--- Importando Regiões ---');

  var regions = await new Ibge().getRegions();

  await Promise.all(
    regions.map(async (data: any) => {
      const regionsAbstractRepository = connectDatabase.getRepository(Region);

      const info = {
        id: data.id,
        name: data.nome,
        acronym: data.sigla,
      };

      let region: any = await regionsAbstractRepository.findOneBy({
        id: data.id,
      });

      if (region) {
        delete info.id;
        regionsAbstractRepository.merge(region, info);
      } else {
        region = regionsAbstractRepository.create(info);
      }

      await regionsAbstractRepository.save(region);
    }),
  );
};

const importStates = async () => {
  console.log('--- Importando Estados ---');

  var states = await new Ibge().getStates();

  let statesData: any = [];

  await Promise.all(
    states.map(async (data: any) => {
      const stateAbstractRepository = connectDatabase.getRepository(State);

      const info = {
        id: data.id,
        name: data.nome,
        acronym: data.sigla,
        region_id: data.regiao.id,
      };

      let state: any = await stateAbstractRepository.findOneBy({
        id: data.id,
      });

      if (state) {
        delete info.id;
        stateAbstractRepository.merge(state, info);
      } else {
        state = stateAbstractRepository.create(info);
      }

      statesData.push(info);

      await stateAbstractRepository.save(state);
    }),
  );

  return statesData;
};

const importCities = async (states: any[]) => {
  console.log('--- Importando Cidades ---');

  await connectDatabase.transaction(async () => {
    await Promise.all(
      states.map(async (state: any) => {
        console.log(`--- Processando ${state.acronym} ---`);

        const response = await new Ibge().getCities(state.acronym);

        await processCities(response);
      }),
    );
  });
};

const processCities = async (cities: any[]) => {
  const cityAbstractRepository = connectDatabase.getRepository(City);

  await Promise.all(
    cities.map(async (city: any) => {
      const info = {
        id: city.id,
        name: city.nome,
        state_id: city.microrregiao.mesorregiao.UF.id,
      };

      city = await cityAbstractRepository.findOneBy({
        id: city.id,
      });

      if (city) {
        delete info.id;
        cityAbstractRepository.merge(city, info);
      } else {
        city = cityAbstractRepository.create(info);
      }

      await cityAbstractRepository.save(city);
    }),
  );
};
