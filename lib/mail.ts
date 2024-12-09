import { EmailTemplate } from "@/components/email/email-template";

interface EmailTemplateProps {
  email: string;
  token: string;
}
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "NextAuth js <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: EmailTemplate({ email, token }),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};