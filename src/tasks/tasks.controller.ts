import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<TaskModel[]> | null {
    return this.taskService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(@Param('id') id: string): Promise<TaskModel> | null {
    return this.taskService.get({ id });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req: any): Promise<TaskModel> | null {
    const taskModel = { ...req.body, userId: req.user.sub, id: uuidv4() };
    return this.taskService.create(taskModel);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() data: any): Promise<any> | null {
    return this.taskService.update({ where: { id: data.id }, data: data });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> | null {
    return this.taskService.delete({ id });
  }
}
