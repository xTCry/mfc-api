export interface IResponseData<T> {
  data: T;
  meta?: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
  links?: {
    self: string;
    first: string;
    next: string;
    last: string;
  };
}

export interface IResponseError {
  source: {
    pointer: string;
    field: string;
  };
  title: string;
  detail: string;
}

/*  */

export enum DataObjectType {
  Service = 'service',
  Mfc = 'mfc',
}

export type LinksType = 'self' | 'first' | 'last';
export type ILinks = Partial<Record<LinksType, string>>;

export interface ISchedule {
  /**
   * Порядковый номер дня недели
   */
  day_of_week: number;
  work_time: {
    /**
     * Рабочее время «с»
     */
    from: string /* Date */;
    /**
     * Рабочее время «до»
     */
    to: string /* Date */;
  };
  dinner_time: {
    /**
     * Обеденное время «с»
     */
    from: string /* Date */;
    /**
     * Обеденное время «до»
     */
    to: string /* Date */;
  };
}

export interface ServiceInAttr {
  service_id: number;
  can_create_appointment: boolean;
}

export interface AddressType {
  text: string;
  cord: {
    /**
     * Долгота
     */
    lat: string;
    /**
     * Широта
     */
    lon: string;
  };
  full?: string;
  parse?: string;
}

export interface ManagerType {
  /**
   * Фамилия руководителя
   */
  last_name: string;
  /**
   * Имя руководителя
   */
  first_name: string;
  /**
   * Отчество руководителя
   */
  second_name: string;
  /**
   * Идентификатор руководителя в АИС
   */
  person_id: string;
}

export interface MfcRecordAttributes {
  /**
   * Идентификатор региона
   */
  region_id: string;
  /**
   * Идентификатор кода региона
   */
  region_code: string;

  original_name: string;
  /**
   * Название МФЦ
   */
  name: string;
  /**
   * Описание МФЦ
   */
  description: string;

  /**
   * Возможность записи в МФЦ
   */
  can_create_appointment: boolean;
  /**
   * Адрес МФЦ
   */
  address: AddressType;
  /**
   * Телефоны
   */
  phones: string[];
  /**
   * Сайт
   */
  url: string;
  /**
   * Эл. Почта
   */
  email: string;

  /**
   * Количество окон
   */
  window_count: number;

  manager: ManagerType;

  schedule: ISchedule[];

  services: ServiceInAttr[];

  /**
   * Ссылки на фотографии МФЦ
   */
  photos: string[];

  doc_service_id: number | null;
  consl_service_id: number | null;

  /**
   * Признак отображения МФЦ в списках
   */
  is_show: boolean;

  is_groups: boolean;
  sort: number;
}

/** Return types */

export interface ResponseMfcRecord {
  type: DataObjectType.Mfc;
  /**
   * Внешний идентификатор МФЦ
   */
  id: string;
  attributes: MfcRecordAttributes;
  links: ILinks;
}

export interface ServiceRecordAttributes {
  /**
   * Идентификатор группы услуг
   */
  // service_group_id?: any;

  /**
   * Внешний идентификатор услуги
   */
  uuid: string;
  /**
   * E-Tag параметр (признак кэширования)
   */
  etag?: string;

  original_name: string;
  /**
   * Наименование
   */
  name: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * НПА
   */
  regularity_documents?: string;
  /**
   * Документы для подачи
   */
  documents?: string;
  /**
   * Результат предоставления
   */
  result_description?: string;
  /**
   * Срок предоставления
   */
  duration?: string;
  /**
   * Список МФЦ где предоставляется услуга (id МФЦ)
   */
  mfc_list: number[];

  payments: any[];

  sort: number;
}

export interface ResponseServiceRecord {
  type: DataObjectType.Service;
  id: number;
  attributes: ServiceRecordAttributes;
  links: ILinks;
}
