import express from "express";
import Candidate from "../models/Candidates.js";

const router = express.Router();

// GET applications (map candidates -> applications view)
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("jobId");

    const applications = candidates.map((c) => ({
      _id: c._id,
      candidate: c.name,
      role: c.jobId?.title || c.jobId?.position || c.role || "",
      createdAt: c.createdAt,
      stage: c.status,
      raw: c,
    }));

    return res.json(applications);
  } catch (err) {
    console.error("Applications fetch error:", err.message);
    return res.status(500).json({ message: err.message });
  }
});

export default router;