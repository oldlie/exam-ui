import { BaseResponse } from './base.response';

export interface ListResponse<T> extends BaseResponse {
    list: Array<T>;
}
