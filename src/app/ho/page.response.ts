import { ListResponse } from './list.response';

export interface PageResponse<T> extends ListResponse<T> {
    totle: number;
}
