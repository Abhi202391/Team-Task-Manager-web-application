// auth.repository.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {

  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  setOtp(email: string, otp: string) {
    this.otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
    });
  }

  getOtp(email: string) {
    return this.otpStore.get(email);
  }

  deleteOtp(email: string) {
    this.otpStore.delete(email);
  }
  
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileImage?: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}