import { BrevoClient } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const isMailConfigured = () => {
  return !!process.env.BREVO_API_KEY;
};

export const verifyTransporter = async () => {
  const ok = isMailConfigured();
  console.log(ok ? "Brevo API Ready" : "Brevo API Key Missing");
  return ok;
};

export async function sendMail({ to, subject, text, html }) {
  return client.transactionalEmails.sendTransacEmail({
    sender: {
      name: process.env.SMTP_FROM_NAME || "TalentFlow AI",
      email: "rajendraacharyarr@gmail.com",
    },
    to: [{ email: to }],
    subject,
    htmlContent: html || `<p>${text}</p>`,
  });
}

export default sendMail;