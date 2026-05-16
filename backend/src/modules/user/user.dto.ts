// user.dto.ts

import { UserRole } from "@prisma/client";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileImage?: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  profileImage?: string;
  role?: UserRole;
}