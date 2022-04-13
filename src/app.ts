import express from 'express';

import IndexRouter from './routes/home.route';
import todoRouter from './routes/todo.route';
import serviceLocator from './shared/DI/injector';

import {IConfigService} from "./shared/services/config/config.service.interface";
import {Constants} from "./shared/DI/constants";
import {requestLoggerInterceptor} from "./shared/interceptors/request-logger.interceptor";
import errorHandler from './shared/middlewares/error.handler';
import './shared/database/connection';

const configService = serviceLocator.get<IConfigService>(Constants.CONFIG_SERVICE);

// Create Express server
const app: express.Express = express();

app.set('port', configService.get<number>('PORT', 8081));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Interceptor Right Before Request Handlers
app.use(requestLoggerInterceptor);

// routes
app.use('/api', IndexRouter);
app.use('/api/todos', todoRouter);

// Generic Error Handler
app.use(errorHandler);



export default app;
