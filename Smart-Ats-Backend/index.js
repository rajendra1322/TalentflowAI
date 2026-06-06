import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";






dotenv.config();

const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://talentflow--ai.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mail", mailRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const smtp = await verifyTransporter();

  if (smtp) {
    console.log("✅ SMTP Connected Successfully");
  } else {
    console.log("❌ SMTP Connection Failed");
  }

});