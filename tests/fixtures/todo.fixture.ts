import {Todo, TodoStatus} from '../../src/entities/todo.entity';
import Chance from 'chance';

const chance = new Chance();

export const getTodo = (overrides?: Partial<Todo>): Todo => {
    const todo = new Todo();
    todo.id = chance.integer({min: 0, max: 100});
    todo.title = chance.sentence({ words: 5 });
    todo.description = chance.paragraph({ sentences: 2 });
    todo.status = chance.pickone(Object.values(TodoStatus));
    todo.createdAt = new Date();
    todo.updatedAt = new Date();
    return {...todo, ...overrides};
};
