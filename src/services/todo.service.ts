import {TodoRepository} from "../repositories/todo.repository";
import HttpException from "../shared/exceptions/http-exception";
import * as HttpStatus from 'http-status';
import {CreateTodoDto} from "../dtos/create-todo.dto";

export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    async getAll(): Promise<any> {
        return await this.todoRepository.getAllTodos();
    }

    async getById(id: number): Promise<any> {
        return this.todoRepository.getTodoById(id);
    }

    async create(todo: CreateTodoDto): Promise<any> {
        try {
            return await this.todoRepository.createTodo({
                title: todo.title,
                description: todo.description,
            });
        } catch (e) {
            throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, todo: any): Promise<any> {
       return await this.todoRepository.updateTodo(id, todo);
    }

    async delete(id: number): Promise<any> {
        return await this.todoRepository.deleteTodo(id);
    }

}
