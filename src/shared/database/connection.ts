import {ConnectionOptions, createConnection} from 'typeorm';
import serviceLocator from '../DI/injector';
import {WinstonLogger} from "../services/logger/winston-logger.service";
import {ILogger} from "../services/logger/logger.service.interface";
import {Constants} from "../DI/constants";
import {IConfigService} from "../services/config/config.service.interface";

const logger: ILogger = new WinstonLogger('Database Connection');
const configService = serviceLocator.get<IConfigService>(Constants.CONFIG_SERVICE);

const connectionOptions: ConnectionOptions = {
    type: "mysql",
    host: configService.get<string>('DB_HOST'),
    port: 3306,
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    logging: true,
    synchronize: false,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: [
        "dist/migration/**/*.js"
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
    }
};

createConnection(connectionOptions).then(async connection => {
    logger.log("Connected to DB");

}).catch(error => logger.error("TypeORM connection error: ", error));
