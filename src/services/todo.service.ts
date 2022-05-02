import HttpException from "../shared/exceptions/http-exception";
import * as HttpStatus from 'http-status';
import {CreateTodoDto} from "../dtos/create-todo.dto";
import {ITodoRepository} from "../repositories/todo/todo.repository.interface";
import {Todo} from "../entities/todo.entity";

export class TodoService {

    constructor(
        private readonly todoRepository: ITodoRepository,
    ) {}

    async getAll(): Promise<Todo[]> {
        try {
            return await this.todoRepository.findAll();
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'Sorry, we could not get your todos at this time.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getById(id: number): Promise<any> {
        try {
            return await this.todoRepository.findById(id);
        } catch (e) {
            throw new HttpException(
                'Sorry, we could not get your todo at this time.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async create(todo: CreateTodoDto): Promise<any> {
        try {
            return await this.todoRepository.create({
                title: todo.title,
                description: todo.description,
            });
        } catch (e) {
            throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, todo: any): Promise<any> {
        const todoToUpdate = await this.todoRepository.findById(id);
        if (!todoToUpdate) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
       try {
           return await this.todoRepository.update(id, todo);
       } catch (e) {
           throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    async delete(id: number): Promise<any> {
        try {
            return await this.todoRepository.delete(id);
        } catch (e) {
            throw new HttpException('Sorry, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
