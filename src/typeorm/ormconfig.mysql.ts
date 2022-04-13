import * as dotenv from 'dotenv';
import {ConnectionOptions} from "typeorm";

dotenv.config();
const config = process.env;
const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  name: 'default',
  host: config.DB_HOST,
  port: 3306,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
