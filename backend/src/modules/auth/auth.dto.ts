// auth.dto.ts

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileImage?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SendOtpDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}