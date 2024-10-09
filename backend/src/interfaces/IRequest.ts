import { IPagination } from './IPagination';

export interface IRequest {
    filters?: Object;
    pagination?: IPagination;
}