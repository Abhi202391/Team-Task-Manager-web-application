// auth.controller.ts

import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {

  //////////////////////////////////////////////////////
  // REGISTER
  //////////////////////////////////////////////////////

  async register(req: Request, res: Response) {
    try {

      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////

  async login(req: Request, res: Response) {
    try {

      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });

    } catch (error: any) {

      return res.status(401).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // PROFILE
  //////////////////////////////////////////////////////

  async profile(req: Request, res: Response) {
    try {

      const user = await authService.getProfile(
        (req as any).user.id
      );

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

  async sendOtp(req: Request, res: Response) {
    try {

      const result = await authService.sendOtp(req.body.email);

      return res.status(200).json({
        success: true,
        ...result,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  //////////////////////////////////////////////////////

  async verifyOtp(req: Request, res: Response) {
    try {

      const { email, otp } = req.body;

      const result = await authService.verifyOtp(email, otp);

      return res.status(200).json({
        success: true,
        ...result,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}