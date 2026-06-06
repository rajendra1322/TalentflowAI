import nodemailer from "nodemailer";


console.log("HOST:", process.env.SMTP_HOST);
console.log("PORT:", process.env.SMTP_PORT);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS:", !!process.env.SMTP_PASS);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const isMailConfigured = () => {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
};

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP Connected");
    return true;
  } catch (err) {
    console.error("SMTP verify failed:", err.message);
    return false;
  }
};

export async function sendMail({
  to,
  subject,
  text,
  html,
}) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  });
}

export default sendMail;