export interface IFilters {
    execute(builder: any, value: any): Promise<any>;
}