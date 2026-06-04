import express from "express";
import { sendMail, isMailConfigured, verifyTransporter } from "../utils/email.js";

const router = express.Router();

// POST /api/mail/send
router.post("/send", async (req, res) => {
  try {
    if (!isMailConfigured()) {
      return res.status(500).json({ message: "SMTP not configured on server. Please set SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM." });
    }

    // optional: verify transporter before sending
    await verifyTransporter();

    const { to, subject, text, html } = req.body;
    if (!to || !subject) return res.status(400).json({ message: "Missing to or subject" });

    const info = await sendMail({ to, subject, text, html });

    return res.json({ ok: true, info });
  } catch (err) {
    console.error("Mail send error:", err && err.message ? err.message : err);
    return res.status(500).json({ message: err && err.message ? err.message : "Failed to send mail" });
  }
});

export default router;
