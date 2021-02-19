
import dotenv from 'dotenv';
import {IConfigService} from "./config.service.interface";

dotenv.config();

export class ConfigService implements IConfigService {
    private readonly config: any;

    constructor() {
        this.config = process.env;
    }

    get<T = any>(propertyPath: string, defaultValue?: T): T {
        const value =  this.config[propertyPath] as T;
        return value || defaultValue;
    }

}
