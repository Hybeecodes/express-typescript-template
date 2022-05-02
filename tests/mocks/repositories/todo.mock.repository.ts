import {ITodoRepository} from "../../../src/repositories/todo/todo.repository.interface";

export class TodoMockRepository implements ITodoRepository {
    public create = jest.fn(() => {
        return Promise.resolve(undefined);
    });

    public delete = jest.fn(() => {
        return Promise.resolve(undefined);
    });

    public findAll = jest.fn(() => {
        return Promise.resolve(undefined);
    });

    public findById = jest.fn(() => {
        return Promise.resolve(undefined);
    });

    public update = jest.fn(() => {
        return Promise.resolve(undefined);
    });

    public deleteAll = jest.fn(() => {
        return Promise.resolve(undefined);
    });

}
