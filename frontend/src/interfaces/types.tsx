export interface Producer {
    id: number;
    cpfOuCnpj: string;
    nomeProdutor: string;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    areaTotal: number;
    areaAgricultavel: number;
    areaVegetacao: number;
    culturas: string[];
  }
  