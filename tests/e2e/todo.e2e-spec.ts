import request from 'supertest';
import app from '../../src/app';
import * as HttpStatus from 'http-status';
import {ResponseStatus} from "../../src/shared/response.interface";
import {dbCreateConnection} from "../../src/shared/database/connection";
import {ITodoRepository} from "../../src/repositories/todo/todo.repository.interface";
import {TodoRepository} from "../../src/repositories/todo/todo.repository";
import {getTodo} from "../fixtures/todo.fixture";

describe('Todos Routes Tests', () => {
    const todoRepository: ITodoRepository = new TodoRepository();
    beforeAll(async () => {
        await dbCreateConnection({isTest: true, migrate: true});
        await todoRepository.create(getTodo());
    });

    afterAll(async () => {
        await todoRepository.deleteAll();
    });
    it('should work fine', async (done) => {
        const res = await request(app).get('/api/todos').set('Accept', 'application/json');
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body.status).toBe(ResponseStatus.SUCCESS);
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toBe('Todos Retrieved Successfully');
        console.log(res.body);
        done();
        done();
    });
});
