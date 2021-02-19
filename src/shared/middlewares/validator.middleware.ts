import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import * as HttpStatus from 'http-status';
import HttpException from "../exceptions/http-exception";

/**
 * @summary validate request inputs
 * @param type {any}
 */
export function validateBody<T>(type: any): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(message, HttpStatus.BAD_REQUEST));
      } else {
        next();
      }
    });
  };
}
