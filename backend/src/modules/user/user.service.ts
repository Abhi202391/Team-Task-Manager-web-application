// user.service.ts

import bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService {

  private userRepository = new UserRepository();

  async createUser(data: CreateUserDto) {

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {

    await this.getUserById(id);

    return this.userRepository.delete(id);
  }
}