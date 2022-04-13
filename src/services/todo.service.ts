import {TodoRepository} from "../repositories/todo.repository";
import HttpException from "../shared/exceptions/http-exception";
import * as HttpStatus from 'http-status';
import {CreateTodoDto} from "../dtos/create-todo.dto";

export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    async getAll(): Promise<any> {
        try {
            return await this.todoRepository.getAllTodos();
        } catch (e) {
            throw new HttpException(
                'Sorry, we could not get your todos at this time.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getById(id: number): Promise<any> {
        try {
            return await this.todoRepository.getTodoById(id);
        } catch (e) {
            throw new HttpException(
                'Sorry, we could not get your todo at this time.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
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
        const todoToUpdate = await this.todoRepository.getTodoById(id);
        if (!todoToUpdate) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
       try {
           return await this.todoRepository.updateTodo(id, todo);
       } catch (e) {
           throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    async delete(id: number): Promise<any> {
        try {
            return await this.todoRepository.deleteTodo(id);
        } catch (e) {
            throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
