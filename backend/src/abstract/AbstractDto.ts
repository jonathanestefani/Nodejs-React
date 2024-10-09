import { IDTO } from '../interfaces/IDto';

export abstract class AbstractDto implements IDTO {
  protected data: any;

  constructor(data: any) {
    this.data = data;
  }

  get(): any {
    return this.data;
  }
}
