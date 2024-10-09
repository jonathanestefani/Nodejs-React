import { IFilters } from '../interfaces/IFilters';

export class DateRange implements IFilters {
  private field: string = '';

  constructor(field: string) {
    this.field = field;
  }

  public execute(builder: any, value: any): Promise<any> {
    const query = builder.getQuery();
    const hasWhereClause = query.toLowerCase().includes('where');

    if (hasWhereClause) {
      return builder
        .andWhere(
          `date(${this.field}) BETWEEN :${this.field}_start AND :${this.field}_end`,
        )
        .setParameter(`${this.field}_start`, value['start'])
        .setParameter(`${this.field}_end`, value['end']);
    }

    return builder
      .where(
        `date(${this.field}) BETWEEN :${this.field}_start AND :${this.field}_end`,
      )
      .setParameter(`${this.field}_start`, value['start'])
      .setParameter(`${this.field}_end`, value['end']);
  }
}
