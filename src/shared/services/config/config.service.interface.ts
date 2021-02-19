export interface IConfigService {
    get<T = any>(propertyPath: string, defaultValue?: T): T;
}
