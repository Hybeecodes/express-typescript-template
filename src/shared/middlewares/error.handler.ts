import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import HttpException from "../exceptions/http-exception";
import {ResponseStatus} from "../response.interface";
import {ResponseDto} from "../response.dto";
import {ILogger} from "../services/logger/logger.service.interface";
import {WinstonLogger} from "../services/logger/winston-logger.service";
const logger: ILogger = new WinstonLogger('Database Connection');
/**
 * Generic Error Handler Middleware
 * @param error
 * @param request
 * @param response
 * @param next
 */
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';
  // modify error object based on dev env
  const resObj = new ResponseDto(ResponseStatus.ERROR, message);
  logger.error(JSON.stringify(resObj));
  response.status(status).send(resObj);
  return next();
}

export default errorMiddleware;
