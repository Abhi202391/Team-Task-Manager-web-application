// task.factory.ts

import { TaskController } from "./task.controller";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";

const taskRepository =
  new TaskRepository();

const taskService =
  new TaskService();

const taskController =
  new TaskController();

export {
  taskRepository,
  taskService,
  taskController,
};