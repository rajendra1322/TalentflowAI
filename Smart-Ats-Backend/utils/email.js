import nodemailer from "nodemailer";
let transporter = null;
let transporterVerified = false;

const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

transporter = createTransporter();

export const isMailConfigured = () => !!transporter;

export const verifyTransporter = async () => {
  if (!transporter) return false;
  try {
    await transporter.verify();
    transporterVerified = true;
    return true;
  } catch (err) {
    transporterVerified = false;
    console.warn('SMTP verify failed:', err.message || err);
    return false;
  }
};

export async function sendMail({ to, subject, text, html }) {
  if (!transporter) throw new Error('SMTP not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_FROM');

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (err) {
    console.error('sendMail error:', err && err.message ? err.message : err);
    throw new Error(err && err.message ? err.message : 'Failed to send mail');
  }
}

export default sendMail;
