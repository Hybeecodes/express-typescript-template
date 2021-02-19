import {NextFunction, Response, Request} from "express";
import {ILogger} from "../services/logger/logger.service.interface";
import {WinstonLogger} from "../services/logger/winston-logger.service";
const logger: ILogger = new WinstonLogger('Request Logger Interceptor');

/**
 * @summary logs payloads all Incoming Requests
 * @param req
 * @param res
 * @param next
 */
export function requestLoggerInterceptor(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const now = new Date().toISOString();
    const reqLogData = {
        method,
        url,
        time: now,
        body: JSON.stringify(req.body),
        query: JSON.stringify(req.query),
    };
    console.log('================= REQUEST ==================');
    logger.log(JSON.stringify(reqLogData));
    console.log('================= REQUEST ==================');
    return next();
}
