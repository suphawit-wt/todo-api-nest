import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { TodoService } from '@app/services';
import { TodoRepository } from '@app/repositories';
import { Todo } from '@app/entities';
import { CreateTodoRequest, UpdateTodoRequest } from '@app/common/dto/request';
import { TodoResponse } from '@app/common/dto/response';
import { NotFoundError, ForbiddenError } from '@app/common/exceptions';

describe('TodoService', () => {
    let todoService: TodoService;

    const mockTodoRepository = {
        getAllByUserId: jest.fn(),
        getByIdWithUser: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodoService,
                {
                    provide: TodoRepository,
                    useValue: mockTodoRepository,
                },
            ],
        }).compile();

        todoService = module.get<TodoService>(TodoService);
    });

    describe('getTodos', () => {
        it('should return an array of todos', async () => {
            const userId: number = 1;
            const todos: Todo[] = [new Todo(), new Todo()];

            mockTodoRepository.getAllByUserId.mockResolvedValue(todos);

            const expected: TodoResponse[] = todos.map(todo => plainToInstance(TodoResponse, todo));
            const actual: TodoResponse[] = await todoService.getTodos(userId);

            expect(actual).toEqual(expected);
        });
    });

    describe('getTodo', () => {
        it('should return a todo if found and owned by user', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const todo = new Todo();
            todo.id = todoId;
            todo.user = { id: userId } as any;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);

            const expected: TodoResponse = plainToInstance(TodoResponse, todo);
            const actual: TodoResponse = await todoService.getTodo(todoId, userId);

            expect(actual).toEqual(expected);
        });

        it('should throw NotFoundException if todo not found', async () => {
            const todoId: number = 5000;
            const userId: number = 1;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(null);

            await expect(todoService.getTodo(todoId, userId)).rejects.toThrow(NotFoundError);
        });

        it('should throw ForbiddenException if user is not owner', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const todo = new Todo();
            todo.user = { id: 5000 } as any;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);

            await expect(todoService.getTodo(todoId, userId)).rejects.toThrow(ForbiddenError);
        });
    });

    describe('createTodo', () => {
        it('should create and return a new todo', async () => {
            const userId: number = 1;
            const req: CreateTodoRequest = { title: 'Test' };
            const todo = Todo.create(req, userId);

            mockTodoRepository.create.mockResolvedValue(todo);

            const expected: TodoResponse = plainToInstance(TodoResponse, todo);
            const actual: TodoResponse = await todoService.createTodo(req, userId);

            expect(actual).toEqual(expected);
        });
    });

    describe('updateTodo', () => {
        it('should update and return the updated todo', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const req: UpdateTodoRequest = { title: 'Updated', completed: true };

            const todo = new Todo();
            todo.id = todoId;
            todo.title = 'Old title';
            todo.completed = false;
            todo.user = { id: userId } as any;

            const updatedTodo = todo;
            Object.assign(updatedTodo, req);

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);
            mockTodoRepository.update.mockResolvedValue(updatedTodo);

            const expected: TodoResponse = plainToInstance(TodoResponse, updatedTodo);
            const actual: TodoResponse = await todoService.updateTodo(todoId, req, userId);

            expect(actual).toEqual(expected);
        });

        it('should throw NotFoundException if todo not found', async () => {
            const todoId: number = 1;
            const userId: number = 1;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(null);

            await expect(todoService.updateTodo(todoId, { title: 'Updated', completed: true }, userId)).rejects.toThrow(NotFoundError);
        });

        it('should throw ForbiddenException if user is not owner', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const todo = new Todo();
            todo.id = todoId;
            todo.user = { id: 5000 } as any;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);

            await expect(todoService.updateTodo(todoId, { title: 'Updated', completed: true }, userId)).rejects.toThrow(ForbiddenError);
        });
    });

    describe('deleteTodo', () => {
        it('should delete the todo', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const todo = new Todo();
            todo.id = todoId;
            todo.user = { id: userId } as any;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);

            await todoService.deleteTodo(todoId, userId);
            expect(mockTodoRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if todo not found', async () => {
            const todoId: number = 1;
            const userId: number = 1;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(null);

            await expect(todoService.deleteTodo(todoId, userId)).rejects.toThrow(NotFoundError);
        });

        it('should throw ForbiddenException if user is not owner', async () => {
            const todoId: number = 1;
            const userId: number = 1;
            const todo = new Todo();
            todo.id = todoId;
            todo.user = { id: 5000 } as any;

            mockTodoRepository.getByIdWithUser.mockResolvedValue(todo);

            await expect(todoService.deleteTodo(todoId, userId)).rejects.toThrow(ForbiddenError);
        });
    });

});