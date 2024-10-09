import axios from 'axios';

export class Ibge {
  private base = `https://servicodados.ibge.gov.br/api/v1/localidades`;

  async getCountries() {
    const res = await axios.get(`${this.base}/paises`);

    if (!res.data) throw 'Países não encontrado';

    return res.data;
  }

  async getRegions() {
    const res = await axios.get(`${this.base}/regioes`);

    if (!res.data) throw 'Regiões não encontrado';

    return res.data;
  }

  async getStates() {
    const res = await axios.get(`${this.base}/estados`);

    if (!res.data) throw 'Estados não encontrado';

    return res.data;
  }

  async getCities(uf: string) {
    const res = await axios.get(`${this.base}/estados/${uf}/municipios`);

    if (!res.data) throw 'Municípios não encontrado';

    return res.data;
  }
}
