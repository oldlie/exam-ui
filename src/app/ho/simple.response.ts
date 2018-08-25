import { BaseResponse } from './base.response';

export interface SimpleResponse<T> extends BaseResponse {
    value: T;
}
