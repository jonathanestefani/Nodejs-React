import { faker } from '@faker-js/faker';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { connectDatabase, closeDatabase, initializeDatabase } from '../config/data-source';
import { CreateRuralProducerUseCase } from '../../useCases/ruralProducer/CreateRuralProducerUseCase';
import { RuralProducerRepository } from '../../repositories/RuralProducerRepository';
import { RuralProducerDTO } from '../../dto/RuralProducer.dto';
import { IRuralProducer } from '../../interfaces/RuralProducer/IRuralProducer';

const { cpf } = require('cpf-cnpj-validator');

beforeAll(async () => {
    await initializeDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('RuralProducer Model', () => {
    test('Deve criar um produtor rural com sucesso', async () => {
        const data: IRuralProducer = {
            producer_name: faker.internet.displayName(),
            inscrition: cpf.generate(),
            farm_name: 'Fazenda Boa Vista',
            state_id: 1,
            city_id: 1,
        }

        const ruralProducer = await new CreateRuralProducerUseCase(
            new RuralProducerRepository(connectDatabase),
            new RuralProducerDTO( data ),
        ).execute();    

        expect(ruralProducer.id).toBeDefined();
        expect(ruralProducer.created_at).toBeDefined();
        expect(ruralProducer.producer_name).toBe(data.producer_name);
        expect(ruralProducer.inscrition).toBe(data.inscrition);
        expect(ruralProducer.farm_name).toBe(data.farm_name);
        expect(ruralProducer.state_id).toBe(data.state_id);
        expect(ruralProducer.city_id).toBe(data.city_id);

        await connectDatabase.destroy();
    });
});
