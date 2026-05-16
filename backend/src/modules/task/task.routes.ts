// task.routes.ts

import { Router } from "express";

import { TaskController } from "./task.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const taskController =
  new TaskController();

//////////////////////////////////////////////////////
// TASK ROUTES
//////////////////////////////////////////////////////

router.post(
  "/",
  authMiddleware,
  taskController.createTask
);

router.get(
  "/",
  authMiddleware,
  taskController.getAllTasks
);

router.get(
  "/:id",
  authMiddleware,
  taskController.getTaskById
);

router.put(
  "/:id",
  authMiddleware,
  taskController.updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  taskController.deleteTask
);

//////////////////////////////////////////////////////
// PROJECT TASKS
//////////////////////////////////////////////////////

router.get(
  "/project/:projectId",
  authMiddleware,
  taskController.getTasksByProject
);

//////////////////////////////////////////////////////
// ATTACHMENTS
//////////////////////////////////////////////////////

router.post(
  "/:taskId/attachments",
  authMiddleware,
  taskController.addAttachment
);

router.delete(
  "/attachments/:id",
  authMiddleware,
  taskController.deleteAttachment
);

export default router;