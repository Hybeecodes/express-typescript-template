import { Router } from 'express';
import {TodoController} from "../controllers/todo.controller";
import {TodoService} from "../services/todo.service";
import {TodoRepository} from "../repositories/todo.repository";
import {validateBody} from "../shared/middlewares/validator.middleware";
import {CreateTodoDto} from "../dtos/create-todo.dto";

const todoController = new TodoController(new TodoService(new TodoRepository()))

const router = Router();

/* GET home page. */
router.get('/', todoController.getTodos);

router.post('/', validateBody(CreateTodoDto), todoController.createTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

router.get('/:id', todoController.getTodo);

export default router;
