import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Get, Post, Put, Delete, Req, Res, Param, Body } from '@nestjs/common/decorators/http';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TodoService } from '@app/services';
import { User } from '@app/entities';
import { JwtAuthGuard } from '@app/common/guards';
import { CreateTodoRequest, UpdateTodoRequest } from '@app/common/dto/request';
import { TodoResponse, ApiResWithData } from '@app/common/dto/response';

@Controller('todos')
@UseGuards(JwtAuthGuard)
@ApiTags('Todo')
@ApiBearerAuth()
export class TodosController {
  constructor(
    private readonly todoService: TodoService
  ) { }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve todos successfully',
  })
  async getTodos(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    const user: User = req.user as User;
    const todos: TodoResponse[] = await this.todoService.getTodos(user.id);
    const response = new ApiResWithData(todos);

    res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve todo successfully',
  })
  async getTodo(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    const user: User = req.user as User;
    const todo: TodoResponse = await this.todoService.getTodo(id, user.id);
    const response = new ApiResWithData(todo);

    res.status(HttpStatus.OK).json(response);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Todo created successfully',
  })
  async createTodo(
    @Req() req: Request,
    @Res() res: Response,
    @Body() reqBody: CreateTodoRequest
  ): Promise<void> {
    const user: User = req.user as User;
    const todo: TodoResponse = await this.todoService.createTodo(reqBody, user.id);
    const response = new ApiResWithData(todo);

    res.status(HttpStatus.CREATED).location(`/api/todos/${todo.id}`).json(response);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todo updated successfully',
  })
  async updateTodo(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() reqBody: UpdateTodoRequest,
  ): Promise<void> {
    const user: User = req.user as User;
    const todo: TodoResponse = await this.todoService.updateTodo(id, reqBody, user.id);
    const response = new ApiResWithData(todo);

    res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Todo deleted successfully',
  })
  async deleteTodo(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    const user: User = req.user as User;
    await this.todoService.deleteTodo(id, user.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }

}