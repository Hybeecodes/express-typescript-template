import {TodoService} from "../../src/services/todo.service";
import {ITodoRepository} from "../../src/repositories/todo/todo.repository.interface";
import {TodoMockRepository} from "../mocks/repositories/todo.mock.repository";
import {CreateTodoDto} from "../../src/dtos/create-todo.dto";
import {getTodo} from "../fixtures/todo.fixture";

describe('TodoService', () => {
  let service: TodoService;
  let todoRepository: ITodoRepository;
  beforeAll(() => {
    todoRepository = new TodoMockRepository(); // use a mock repository
    service = new TodoService(todoRepository);
  });

  describe('TodoService should be Defined', () => {
    it('should pass', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getTodos', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [getTodo({id: 1}), getTodo({id: 2})];
      todoRepository.findAll = jest.fn().mockResolvedValue(mockTodos);
      const todos = await service.getAll();
      expect(todos).toBeDefined();
      expect(todos.length).toBeGreaterThan(0);
      expect(todos[0].id).toBe(1);
      expect(todos[0]).toHaveProperty('title');
      expect(todos[0]).toHaveProperty('description');
    });
  });

  describe('getTodo', () => {
    it('should return a todo', async () => {
      const mockTodo = getTodo({id: 1});
      todoRepository.findById = jest.fn().mockResolvedValue(mockTodo);
      const todo = await service.getById(1);
      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('description');
    });
  });


  describe('createTodo', () => {
    it('should return a todo', async () => {
      const mockTodo = getTodo({id: 1});
      todoRepository.create = jest.fn().mockResolvedValue(mockTodo);
      const payload: CreateTodoDto = {
        title: 'test',
        description: 'test'
      };
      const todo = await service.create(payload);
      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('description');
    });

  });

  describe('updateTodo', () => {
    it('should return a todo', async () => {
      const mockTodo = getTodo({id: 1});
      todoRepository.findById = jest.fn().mockResolvedValue(mockTodo);
      todoRepository.update = jest.fn().mockResolvedValue(mockTodo);
      const payload: CreateTodoDto = {
        title: 'test',
        description: 'test'
      };
      const todo = await service.update(1, payload);
      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('description');
    });
  });

  describe('deleteTodo', () => {
    it('should return a todo', async () => {
      const mockTodo = getTodo({id: 1});
      todoRepository.delete = jest.fn().mockResolvedValue(mockTodo);
      const todo = await service.delete(1);
      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('description');
    });
  });


});
