import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> => {
  try {
    //////////////////////////////////////////////////////
    // CREATE TRANSPORTER
    //////////////////////////////////////////////////////

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //////////////////////////////////////////////////////
    // MAIL OPTIONS
    //////////////////////////////////////////////////////

    const mailOptions = {
      from: `"TMS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    //////////////////////////////////////////////////////
    // SEND EMAIL
    //////////////////////////////////////////////////////

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

  } catch (error: any) {

    console.error("Error sending email:", error);

    throw new ApiError(500, "Email sending failed");
  }
};

export default sendEmail;