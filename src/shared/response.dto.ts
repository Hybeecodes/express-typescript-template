import {IResponse, responseStatus} from "./response.interface";

/**
 * @summary Generic Response Object class (blueprint). This uses the JSEND pattern
 */
export class ResponseDto implements IResponse {
  data: any;
  message: string;
  status: responseStatus;

  constructor(status: responseStatus, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
