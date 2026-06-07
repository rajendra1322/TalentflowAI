import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, description, skills, experience } = req.body;

    // basic validation
    if (!title || !company) {
      return res.status(400).json({ message: "Job title and company are required" });
    }

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location?.trim() || "",
      description: description?.trim() || "",
      skills: Array.isArray(skills)
        ? skills.map(s => s.trim().toLowerCase()).filter(Boolean)
        : typeof skills === "string"
        ? skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean)
        : [],
      experience: Number(experience) || 0,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json(job);
  } catch (err) {
    console.error("createJob error:", err);
    return res.status(500).json({ message: err.message });
  }
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

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (err) {
    console.error("getJobs error:", err);
    return res.status(500).json({ message: err.message });
  }
};