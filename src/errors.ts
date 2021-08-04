import { AxiosError } from 'axios';
import { IResponseError } from './types';

export class ResponseError extends Error {
  constructor(readonly paylaod: IResponseError) {
    super(paylaod.detail);
    this.name = 'ResponseError';
  }
}

export class NotFoundError extends Error {
  constructor(readonly paylaod: IResponseError) {
    super(paylaod.detail);
    this.name = 'NotFoundError';
  }
}

export class AuthError extends Error {
  constructor() {
    super('Access is denied');
    this.name = 'AuthError';
  }
}

export class UnknownError extends Error {
  constructor(axiosError: AxiosError) {
    super(axiosError.message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownError);
    }
    this.name = 'UnknownError';
  }
}
