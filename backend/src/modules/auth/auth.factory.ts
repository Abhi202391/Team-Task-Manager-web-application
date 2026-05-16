// auth.factory.ts

import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

const authRepository = new AuthRepository();

const authService = new AuthService();

const authController = new AuthController();

export {
  authRepository,
  authService,
  authController,
};