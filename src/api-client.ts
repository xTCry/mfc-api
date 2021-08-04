import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import * as queryString from 'query-string';
import { Cacheable, Cached } from '@d-fischer/cache-decorators';
import { AuthError, NotFoundError, ResponseError, UnknownError } from './errors';
import { IResponseData, ResponseMfcRecord, ResponseServiceRecord } from './types';
import { flattenObject } from './utils';

@Cacheable
export class ApiClient {
  public static readonly API_URL = 'https://mfc-d.com/api/v1/';

  private readonly _httpClient: AxiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this._httpClient = axios.create({ baseURL: ApiClient.API_URL, ...options });
  }

  @Cached(1)
  private async callApi<T = unknown>(url: string, data: any, method: Method = 'GET') {
    try {
      if (method.toLowerCase() === 'get') {
        url = queryString.stringifyUrl({ url, query: flattenObject(data) }, {});
        data = undefined;
      }

      const resp = await this._httpClient.request<IResponseData<T>>({
        method,
        data,
        url,
      });
      return resp.data;
    } catch (e) {
      if (e.isAxiosError) {
        const error = e as AxiosError;
        if (error.response) {
          if (error.response.status === 403) {
            throw new AuthError();
          }
          if (error.response.data?.errors) {
            const [firstError] = error.response.data?.errors;
            if (error.response.status === 404) {
              throw new NotFoundError(firstError);
            }
            throw new ResponseError(firstError);
          }
        }
        throw new UnknownError(error);
      }
      throw e;
    }
  }

  /**
   * Список всех МФЦ в регионе
   * @param region_id ИД региона
   */
  mfcList = (region_id: number | string, { filter = {}, ...other }: any = {}) =>
    this.callApi<ResponseMfcRecord[]>('mfc', { filter: { region_id, ...filter }, ...other });

  /**
   * Список услуг
   * @param region_id ИД региона
   */
  serviceList = (filter: Partial<ResponseServiceRecord> = {}, other: any = {}) =>
    this.callApi<ResponseServiceRecord[]>('service', {
      filter: filter,
      ...other,
    });

  /**
   * Выбранный МФЦ
   * @param id ИД МФЦ
   */
  mfc = (id: number | string, other: any = {}) => this.callApi<ResponseMfcRecord>(`mfc/${id}`, { ...other });

  /**
   * Услуга
   * @param id ИД Услуги
   */
  service = (id: number | string, other: any = {}) =>
    this.callApi<ResponseServiceRecord>(`service/${id}`, { ...other });
}
