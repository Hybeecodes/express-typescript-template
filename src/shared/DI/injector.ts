import {serviceLocator} from './service-locator';
import {Constants} from "./constants";
import {WinstonLogger} from "../services/logger/winston-logger.service";
import {ConfigService} from "../services/config/config.service";
import {HomeController} from "../../controllers/home.controller";
import {IConfigService} from "../services/config/config.service.interface";
import {TodoService} from "../../services/todo.service";
import {TodoController} from "../../controllers/todo.controller";

/**
 * @summary This helper file uses the service locator to register dependencies
 */
serviceLocator.register(Constants.LOGGER, () => {
    return WinstonLogger; // TODO:: This should not be here
});

serviceLocator.register(Constants.CONFIG_SERVICE, () => {
    return new ConfigService();
});

serviceLocator.register(Constants.HOME_CONTROLLER, () => {
    const configService = serviceLocator.get<IConfigService>(Constants.CONFIG_SERVICE);
    return new HomeController(configService);
});

// serviceLocator.register(Constants.TODO_SERVICE, () => {
//     return new TodoService();
// });

serviceLocator.register(Constants.TODO_CONTROLLER, () => {
    const todoService = serviceLocator.get<TodoService>(Constants.TODO_SERVICE);
    return new TodoController(todoService);
});

export default serviceLocator;
