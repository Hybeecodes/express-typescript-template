import { getRepository } from "typeorm";
import {Todo} from "../../entities/todo.entity";
import {ITodoRepository} from "./todo.repository.interface";

export class TodoRepository implements ITodoRepository {
    async deleteAll(): Promise<void> {
        await getRepository(Todo).delete({});
    }
    async create(todo: Todo): Promise<Todo> {
        const todoRepository = getRepository(Todo);
        const newTodo = await todoRepository.create(todo);
        return await todoRepository.save(newTodo);
    }

    async delete(id: number): Promise<void> {
        const todoRepository = getRepository(Todo);
        const todo = await todoRepository.findOne(id);
        if (todo) {
            await todoRepository.delete(id);
        }
    }

    async findAll(): Promise<Todo[]> {
        const todoRepository = getRepository(Todo);
        return await todoRepository.find();
    }

   async findById(id: number): Promise<Todo> {
        const todoRepository = getRepository(Todo);
        return await todoRepository.findOne(id);
    }

    async update(id: number, todo: Partial<Todo>): Promise<Todo> {
        const todoRepository = getRepository(Todo);
        const updatedTodo = await todoRepository.findOne(id);
        if (updatedTodo) {
            await todoRepository.update(id, todo);
            return await todoRepository.findOne(id);
        }
        return null;
    }

}
