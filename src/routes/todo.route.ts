import { Router } from 'express';
import {TodoController} from "../controllers/todo.controller";
import {validateBody} from "../shared/middlewares/validator.middleware";
import {CreateTodoDto} from "../dtos/create-todo.dto";
import {serviceLocator} from "../shared/DI/service-locator";
import {Constants} from "../shared/DI/constants";

const todoController = serviceLocator.get<TodoController>(Constants.TODO_CONTROLLER);

const router = Router();

router.get('/', todoController.getTodos);

router.post('/', validateBody(CreateTodoDto), todoController.createTodo);

router.put('/:id', validateBody(CreateTodoDto), todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

router.get('/:id', todoController.getTodo);

export default router;
