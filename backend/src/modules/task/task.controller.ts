// task.controller.ts

import { Request, Response } from "express";

import { TaskService } from "./task.service";

const taskService = new TaskService();

export class TaskController {

  //////////////////////////////////////////////////////
  // CREATE TASK
  //////////////////////////////////////////////////////

  async createTask(
    req: Request,
    res: Response
  ) {

    try {

      const user = (req as any).user;

      const task =
        await taskService.createTask(
          req.body,
          user.id
        );

      return res.status(201).json({
        success: true,
        message:
          "Task created successfully",
        data: task,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // GET ALL TASKS
  //////////////////////////////////////////////////////

  async getAllTasks(
    req: Request,
    res: Response
  ) {

    try {

      const tasks =
        await taskService.getAllTasks();

      return res.status(200).json({
        success: true,
        data: tasks,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // GET TASK BY ID
  //////////////////////////////////////////////////////

  async getTaskById(
    req: Request,
    res: Response
  ) {

    try {

      const task =
        await taskService.getTaskById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: task,
      });

    } catch (error: any) {

      return res.status(404).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // GET TASKS BY PROJECT
  //////////////////////////////////////////////////////

  async getTasksByProject(
    req: Request,
    res: Response
  ) {

    try {

      const tasks =
        await taskService.getTasksByProject(
          req.params.projectId
        );

      return res.status(200).json({
        success: true,
        data: tasks,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // UPDATE TASK
  //////////////////////////////////////////////////////

  async updateTask(
    req: Request,
    res: Response
  ) {

    try {

      const task =
        await taskService.updateTask(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Task updated successfully",
        data: task,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // DELETE TASK
  //////////////////////////////////////////////////////

  async deleteTask(
    req: Request,
    res: Response
  ) {

    try {

      await taskService.deleteTask(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Task deleted successfully",
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // ADD ATTACHMENT
  //////////////////////////////////////////////////////

  async addAttachment(
    req: Request,
    res: Response
  ) {

    try {

      const attachment =
        await taskService.addAttachment(
          req.params.taskId,
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Attachment added successfully",
        data: attachment,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // DELETE ATTACHMENT
  //////////////////////////////////////////////////////

  async deleteAttachment(
    req: Request,
    res: Response
  ) {

    try {

      await taskService.deleteAttachment(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Attachment deleted successfully",
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }
}