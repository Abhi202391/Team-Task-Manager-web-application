// auth.routes.ts

import { Router } from "express";

import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const authController = new AuthController();

//////////////////////////////////////////////////////
// PUBLIC ROUTES
//////////////////////////////////////////////////////

router.post("/register", authController.register);

router.post("/login", authController.login);

//////////////////////////////////////////////////////
// PRIVATE ROUTES
//////////////////////////////////////////////////////

router.get(
  "/profile",
  authMiddleware,
  authController.profile
);

router.post("/send-otp", authController.sendOtp);

router.post("/verify-otp", authController.verifyOtp);

export default router;