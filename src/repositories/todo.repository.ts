import {DeepPartial, getRepository} from "typeorm";
import {Todo} from "../entities/todo.entity";

export class TodoRepository {
    async getAllTodos() {
        const todoRepository = getRepository(Todo);
        return await todoRepository.find();
    }

    async getTodoById(id: number) {
        const todoRepository = getRepository(Todo);
        return await todoRepository.findOne(id);
    }

    async createTodo(todo: DeepPartial<Todo>) {
        const todoRepository = getRepository(Todo);
        const newTodo = await todoRepository.create(todo);
        return await todoRepository.save(newTodo);
    }

    async updateTodo(id: number, todo: Todo) {
        const todoRepository = getRepository(Todo);
        const updatedTodo = await todoRepository.findOne(id);
        if (updatedTodo) {
            await todoRepository.update(id, todo);
            return await todoRepository.findOne(id);
        }
        return null;
    }

    async deleteTodo(id: number) {
        const todoRepository = getRepository(Todo);
        const todo = await todoRepository.findOne(id);
        if (todo) {
            await todoRepository.delete(id);
            return todo;
        }
        return null;
    }

}
