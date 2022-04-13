import {TodoService} from "../services/todo.service";
import {ResponseDto} from "../shared/response.dto";
import {ResponseStatus} from "../shared/response.interface";
import * as HttpStatus from "http-status";
import {NextFunction, RequestHandler, Request, Response} from "express";
import {CreateTodoDto} from "../dtos/create-todo.dto";

export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    getTodos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todos = await this.todoService.getAll();
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, 'Todos Retrieved Successfully', todos);
            return res.status(HttpStatus.OK).json(resObj);
        } catch (e) {
            next(e);
        }
    }

    getTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.getById(parseInt(req.params.id));
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, 'Todo Retrieved Successfully', todo);
            return res.status(HttpStatus.OK).json(resObj);
        } catch (e) {
            next(e);
        }
    }

    createTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.create(req.body as CreateTodoDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, 'Todo Created Successfully', todo);
            return res.status(HttpStatus.CREATED).json(resObj);
        } catch (e) {
           next(e);
        }
    }

    updateTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const todo = await this.todoService.update(parseInt(req.params.id), req.body as CreateTodoDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, 'Todo Updated Successfully', todo);
            return res.status(HttpStatus.OK).json(resObj);
        } catch (e) {
            next(e);
        }
    }

    deleteTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.delete(parseInt(req.params.id));
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, 'Todo Deleted Successfully', todo);
            return res.status(HttpStatus.OK).json(resObj);
        } catch (e) {
            next(e);
        }
    }

}
