import { transports, Logger, createLogger, LoggerOptions, format } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;
import {ILogger} from "./logger.service.interface";
import {IConfigService} from "../config/config.service.interface";
import {ConfigService} from "../config/config.service";

/**
 * @summary An Implementation of the Logger Service Interface using Winston package
 */

export class WinstonLogger implements ILogger {
    private readonly logConfig: LoggerOptions;
    private readonly configService: IConfigService;

    public logger: Logger;
    constructor(context?: string) {
        this.configService = new ConfigService();
        const filePath = this.configService.get<string>('LOG_FILE_PATH', '/logs');
        this.logConfig = {
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: filePath,
                }),
            ],
            format: combine(label({ label: context || '' }), timestamp(), prettyPrint()),
        };
        this.logger = createLogger(this.logConfig);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    log(message: any, context?: string): any {
        this.logger.info(message);
    }

    verbose(message: any, context?: string): any {
    }
}
