// auth.service.ts

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import sendEmail from "../../utils/sendEmail";
export class AuthService {

  private authRepository = new AuthRepository();

  //////////////////////////////////////////////////////
  // REGISTER
  //////////////////////////////////////////////////////

  async register(data: RegisterDto) {

    const existingUser = await this.authRepository.findUserByEmail(
      data.email
    );

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////

  async login(data: LoginDto) {

    const user = await this.authRepository.findUserByEmail(
      data.email
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  //////////////////////////////////////////////////////
  // GET PROFILE
  //////////////////////////////////////////////////////

  async getProfile(userId: string) {

    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  //////////////////////////////////////////////////////
  // JWT GENERATOR
  //////////////////////////////////////////////////////

  generateToken(payload: {
    id: string;
    email: string;
    role: string;
  }) {

    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
  }

  //////////////////////////////////////////////////////
    // SEND OTP
    //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  // SEND OTP
  //////////////////////////////////////////////////////

  async sendOtp(email: string) {

    //////////////////////////////////////////////////////
    // CHECK IF USER ALREADY EXISTS
    //////////////////////////////////////////////////////

    const existingUser =
      await this.authRepository.findUserByEmail(
        email
      );

    if (existingUser) {

      throw new Error(
        "User already exists with this email"
      );
    }

    //////////////////////////////////////////////////////
    // GENERATE OTP
    //////////////////////////////////////////////////////

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //////////////////////////////////////////////////////
    // STORE OTP
    //////////////////////////////////////////////////////

    this.authRepository.setOtp(
      email,
      otp
    );

    //////////////////////////////////////////////////////
    // SEND EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({
      to: email,

      subject: "Verify Your Email Address",

      text:
        `Your OTP is ${otp}. ` +
        `It is valid for 5 minutes.`,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>OTP Verification</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, sans-serif;
          "
        >

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background-color: #f4f7fb;
              padding: 40px 0;
            "
          >

            <tr>

              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 600px;
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow:
                      0 4px 20px rgba(0,0,0,0.08);
                  "
                >

                  <!-- HEADER -->

                  <tr>

                    <td
                      align="center"
                      style="
                        background:
                          linear-gradient(
                            135deg,
                            #2563eb,
                            #4f46e5
                          );
                        padding: 40px 20px;
                      "
                    >

                      <h1
                        style="
                          color: #ffffff;
                          margin: 0;
                          font-size: 28px;
                          font-weight: 700;
                        "
                      >

                        Project Flow

                      </h1>

                      <p
                        style="
                          color: #dbeafe;
                          margin-top: 10px;
                          font-size: 15px;
                        "
                      >

                        Secure Email Verification

                      </p>

                    </td>

                  </tr>

                  <!-- CONTENT -->

                  <tr>

                    <td
                      style="
                        padding: 40px 35px;
                        color: #1f2937;
                      "
                    >

                      <h2
                        style="
                          margin-top: 0;
                          font-size: 24px;
                          color: #111827;
                        "
                      >

                        Verify Your Email

                      </h2>

                      <p
                        style="
                          font-size: 16px;
                          line-height: 1.7;
                          color: #4b5563;
                        "
                      >

                        Hello,

                        <br /><br />

                        Use the verification code below
                        to complete your signup process.

                      </p>

                      <!-- OTP BOX -->

                      <div
                        style="
                          margin: 35px 0;
                          text-align: center;
                        "
                      >

                        <div
                          style="
                            display: inline-block;
                            background: #eff6ff;
                            color: #2563eb;
                            padding: 18px 40px;
                            font-size: 36px;
                            font-weight: bold;
                            letter-spacing: 10px;
                            border-radius: 14px;
                            border:
                              2px dashed #93c5fd;
                          "
                        >

                          ${otp}

                        </div>

                      </div>

                      <p
                        style="
                          font-size: 15px;
                          line-height: 1.7;
                          color: #6b7280;
                        "
                      >

                        This OTP is valid for
                        <strong>5 minutes</strong>.

                        <br /><br />

                        If you did not request this,
                        please ignore this email.

                      </p>

                    </td>

                  </tr>

                  <!-- FOOTER -->

                  <tr>

                    <td
                      align="center"
                      style="
                        padding: 25px;
                        background: #f9fafb;
                        border-top:
                          1px solid #e5e7eb;
                      "
                    >

                      <p
                        style="
                          margin: 0;
                          font-size: 13px;
                          color: #9ca3af;
                        "
                      >

                        © ${new Date().getFullYear()}
                        Project Flow.
                        All rights reserved.

                      </p>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

          </table>

        </body>

        </html>
      `,
    });

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return {
      message: "OTP sent successfully",
    };
  }

  //////////////////////////////////////////////////////
  // VERIFY OTP
  //////////////////////////////////////////////////////

  async verifyOtp(email: string, otp: string) {

    const record = this.authRepository.getOtp(email);

    if (!record) {
      throw new Error("OTP expired or not found");
    }

    if (record.expiresAt < Date.now()) {
      this.authRepository.deleteOtp(email);
      throw new Error("OTP expired");
    }

    if (record.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    this.authRepository.deleteOtp(email);

    return {
      message: "OTP verified successfully",
    };
  }
}