import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "TMS <onboarding@resend.dev>", // free tier mein ye use karo
      to,
      subject,
      html,
    });

    if (error) throw new Error(error.message);

    console.log("Email sent:", data);

  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Email sending failed");
  }
};

export default sendEmail;
