import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getJobs);

// only recruiters and admins can post jobs
router.post("/", protect, requireRole(["recruiter", "admin"]), createJob);

export default router;