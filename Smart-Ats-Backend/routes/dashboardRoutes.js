import express from "express";
import Candidate from "../models/Candidates.js";
import Job from "../models/Job.js";

const router = express.Router();

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalCandidates = await Candidate.countDocuments();

    const shortlisted = await Candidate.countDocuments({
      status: "Shortlisted",
    });

    const selected = await Candidate.countDocuments({
      status: "Selected",
    });

    const rejected = await Candidate.countDocuments({
      status: "Rejected",
    });

    const interview = await Candidate.countDocuments({
      status: "Interview",
    });

    const avgMatch =
      await Candidate.aggregate([
        {
          $group: {
            _id: null,
            avgScore: {
              $avg: "$matchScore",
            },
          },
        },
      ]);

    res.json({
      totalJobs,
      totalCandidates,
      shortlisted,
      selected,
      rejected,
      interview,
      avgMatch:
        avgMatch[0]?.avgScore || 0,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;