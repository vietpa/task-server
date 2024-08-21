import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async get(taskWhereUniqueInput: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.findUnique({ where: taskWhereUniqueInput });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, where } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({
      where,
    });
  }
}
