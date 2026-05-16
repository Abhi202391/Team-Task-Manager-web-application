// task.repository.ts

import { PrismaClient } from "@prisma/client";

import {
  AddTaskAttachmentDto,
  CreateTaskDto,
  UpdateTaskDto,
} from "./task.dto";

const prisma = new PrismaClient();

export class TaskRepository {

  //////////////////////////////////////////////////////
  // CREATE TASK
  //////////////////////////////////////////////////////

  async create(
    data: CreateTaskDto,
    createdById: string
  ) {

    return prisma.task.create({
      data: {
        ...data,
        createdById,
      },

      include: {
        project: true,

        createdBy: true,

        assignees: {
          include: {
            user: true,
          },
        },

        attachments: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL TASKS
  //////////////////////////////////////////////////////

  async findAll() {

    return prisma.task.findMany({
      include: {
        project: true,
        assignees: {
          include: {
            user: true,
          },
        },
        createdBy: true,
        attachments: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET TASK BY ID
  //////////////////////////////////////////////////////

  async findById(id: string) {

    return prisma.task.findUnique({
      where: { id },

      include: {
        project: true,
        assignees: {
          include: {
            user: true,
          },
        },
        createdBy: true,
        attachments: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET TASKS BY PROJECT
  //////////////////////////////////////////////////////

  async findByProjectId(projectId: string) {

    return prisma.task.findMany({
      where: {
        projectId,
      },

      include: {
        assignees: {
          include: {
            user: true,
          },
        },
        createdBy: true,
        attachments: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // UPDATE TASK
  //////////////////////////////////////////////////////

  async update(
    id: string,
    data: any
  ) {

    return prisma.task.update({
      where: { id },
      data,

      include: {
        project: true,
        assignees: {
          include: {
            user: true,
          },
        },
        createdBy: true,
        attachments: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // DELETE TASK
  //////////////////////////////////////////////////////

  async delete(id: string) {

    return prisma.task.delete({
      where: { id },
    });
  }

  //////////////////////////////////////////////////////
  // ADD ATTACHMENT
  //////////////////////////////////////////////////////

  async addAttachment(
    taskId: string,
    data: AddTaskAttachmentDto
  ) {

    return prisma.taskAttachment.create({
      data: {
        taskId,
        ...data,
      },
    });
  }

  //////////////////////////////////////////////////////
  // DELETE ATTACHMENT
  //////////////////////////////////////////////////////

  async deleteAttachment(id: string) {

    return prisma.taskAttachment.delete({
      where: { id },
    });
  }
}