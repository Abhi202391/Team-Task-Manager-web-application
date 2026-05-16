// user.factory.ts

import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const userRepository = new UserRepository();

const userService = new UserService();

const userController = new UserController();

export {
  userRepository,
  userService,
  userController,
};