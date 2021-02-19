/**
 * @summary A simple implementation of a service locator. It is used to register and keep track of dependencies that are to be injected
 */
class ServiceLocator {
    private dependencyMap: {};
    private dependencyCache: {};

    constructor() {
        this.dependencyMap = {};
        this.dependencyCache = {};
    }

    register (dependencyName: string, constructor: Function): void {
        if(typeof constructor !== 'function') {
            throw new Error(`${dependencyName} : Dependency constructor is not a function`);
        }

        if(!dependencyName) {
            throw new Error('Invalid dependency name provided');
        }

        this.dependencyMap[dependencyName] = constructor;
    }

    get<T> (dependencyName: string): T {
        if(this.dependencyMap[dependencyName] === undefined) {
            throw new Error(`${dependencyName} : Attempting to retrieve unknown dependency`);
        }

        if(typeof this.dependencyMap[dependencyName] !== 'function'){
            throw new Error(`${dependencyName} : Dependency constructor is not a function`);
        }

        if(this.dependencyCache[dependencyName] === undefined) {
            const dependencyConstructor = this.dependencyMap[dependencyName];
            const dependency = dependencyConstructor(this);
            if(dependency) {
                this.dependencyCache[dependencyName] = dependency;
            }
        }
        return this.dependencyCache[dependencyName];
    }

    clear()  {
        this.dependencyCache = {};
        this.dependencyMap = {};
    }

}

export const serviceLocator = new ServiceLocator();
