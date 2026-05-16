// user.controller.ts

import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {

  async createUser(req: Request, res: Response) {
    try {

      const user = await userService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {

      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: users,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  async getUserById(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const user = await userService.getUserById(id);

      return res.status(200).json({
        success: true,
        data: user,
      });

    } catch (error: any) {

      return res.status(404).json({
        success: false,
        message: error.message,
      });

    }
  }

  async updateUser(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const user = await userService.updateUser(id, req.body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  async deleteUser(req: Request, res: Response) {
    try {

      const { id } = req.params;

      await userService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }
}