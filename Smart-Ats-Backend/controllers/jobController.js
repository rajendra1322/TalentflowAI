import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
};

export const getJobs = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search && search.trim()) {
      const q = search.trim();
      filter = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { company: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { skills: { $in: [q.toLowerCase()] } },
        ],
      };
    }

    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    console.error("getJobs error:", err);
    res.status(500).json({ message: err.message });
  }
};