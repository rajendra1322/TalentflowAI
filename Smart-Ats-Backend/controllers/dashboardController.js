import Job from "../models/Job.js";
import Candidate from "../models/Candidates.js";

export const getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.countDocuments();

    const candidates =
      await Candidate.countDocuments();

    const shortlisted =
      await Candidate.countDocuments({
        status: "Shortlisted",
      });

    const selected =
      await Candidate.countDocuments({
        status: "Selected",
      });

    const rejected =
      await Candidate.countDocuments({
        status: "Rejected",
      });

    res.json({
      jobs,
      candidates,
      shortlisted,
      selected,
      rejected,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};