import { Producer } from '../interfaces/types';

export const mockProducers: Producer[] = [
  {
    id: 1,
    cpfOuCnpj: '12345678901',
    nomeProdutor: 'Produtor A',
    nomeFazenda: 'Fazenda A',
    cidade: 'São Paulo',
    estado: 'SP',
    areaTotal: 100,
    areaAgricultavel: 80,
    areaVegetacao: 20,
    culturas: ['Soja', 'Milho'],
  },
  {
    id: 2,
    cpfOuCnpj: '12345678901234',
    nomeProdutor: 'Produtor B',
    nomeFazenda: 'Fazenda B',
    cidade: 'Curitiba',
    estado: 'PR',
    areaTotal: 200,
    areaAgricultavel: 150,
    areaVegetacao: 50,
    culturas: ['Café', 'Algodão'],
  },
];
