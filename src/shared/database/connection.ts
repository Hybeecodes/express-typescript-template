import {Connection, createConnection, getConnectionManager} from 'typeorm';
import {WinstonLogger} from "../services/logger/winston-logger.service";
import {ILogger} from "../services/logger/logger.service.interface";
import connectionOptions from "../../typeorm/ormconfig.mysql";

const logger: ILogger = new WinstonLogger('Database Connection');

export const dbCreateConnection = async (): Promise<Connection | null> => {
    try {
        const conn = await createConnection(connectionOptions);
        logger.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    } catch (err) {
        logger.error(`Database connection error: ${err}`);
        if (err.name === 'AlreadyHasActiveConnectionError') {
            return getConnectionManager().get(connectionOptions.name);
        }
        logger.error(err);
    }
    return null;
};
