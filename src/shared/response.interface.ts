/**
 * Application Response Interface
 */
export interface IResponse {
  status: responseStatus;
  message: string;
  data: any;
}

/**
 * @summary Response status Enum that contains the possible values of the status property of the response object
 */
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type responseStatus = ResponseStatus.ERROR | ResponseStatus.SUCCESS;
