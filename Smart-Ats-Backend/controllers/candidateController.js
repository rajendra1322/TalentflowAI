import Candidate from "../models/Candidates.js";
import Job from "../models/Job.js";
import { scoreCandidate } from "../utils/scoreCandidate.js";
import { getRecommendation } from "../utils/recommendation.js";
import { parseResume } from "../utils/resumeParser.js";
import { extractSkills } from "../utils/extractSkills.js";
import { sendMail } from "../utils/email.js";

// NORMALIZE SKILLS HELPER
const normalizeSkills = (skills) => {
    if (!skills) return [];

    if (Array.isArray(skills)) {
        return skills.map(s => s.trim().toLowerCase()).filter(Boolean);
    }

    if (typeof skills === "string") {
        return skills
            .split(",")
            .map(s => s.trim().toLowerCase())
            .filter(Boolean);
    }

    return [];
};

// ADD CANDIDATE
export const addCandidate = async (req, res) => {
    try {
        const { name, email, phone, skills, experience, jobId } = req.body;
        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : email;

        let resumeUrl = "";

        if (req.file) {
            try {
                const { uploadBuffer } = await import("../utils/cloudinary.js");
                const result = await uploadBuffer(req.file.buffer, { folder: "resumes" });
                resumeUrl = result?.secure_url || "";
            } catch (cloudErr) {
                console.error("Cloudinary upload failed:", cloudErr?.message || cloudErr);
                resumeUrl = "";
            }
        }

        //  check job exists before anything else
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        //  check duplicate before creating
        const existing = await Candidate.findOne({ email: normalizedEmail, jobId });
        if (existing) {
            return res.status(400).json({
                message: "Candidate already applied for this job",
            });
        }

        let candidateSkills = normalizeSkills(skills);

        //  parse resume only if no manual skills provided
        if ((!candidateSkills || candidateSkills.length === 0) && req.file) {
            try {
                const resumeText = await parseResume(req.file.buffer);
                candidateSkills = extractSkills(resumeText);
            } catch (parseErr) {
                console.warn("Resume parse failed, continuing with empty skills:", parseErr?.message || parseErr);
                candidateSkills = [];
            }
        }

        const jobSkills = normalizeSkills(job.skills);

        const matchScore = scoreCandidate(candidateSkills, jobSkills);

        const rec = getRecommendation(matchScore);
        const recommendation = typeof rec === "string" ? rec : rec?.label || "Not Evaluated";

        //  auto status based on score
        let status = "Applied";
        if (matchScore >= 85) status = "Interview";
        else if (matchScore >= 70) status = "Shortlisted";

        const candidate = await Candidate.create({
            name,
            email: normalizedEmail,
            phone,
            skills: candidateSkills,
            experience,
            jobId,
            resumeUrl,
            matchScore,
            recommendation,
            status,
        });

        return res.status(201).json(candidate);
    } catch (err) {
        console.error("addCandidate error:", err);
        return res.status(500).json({ message: err.message });
    }
};

// GET ALL CANDIDATES
export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().populate("jobId");
        return res.json(candidates);
    } catch (err) {
        console.error("getCandidates error:", err);
        return res.status(500).json({ message: err.message });
    }
};

// UPDATE STATUS
export const updateCandidateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        //  fixed: use "new: true" instead of returnDocument, populate jobId directly
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("jobId");

        //  proper 404 response if candidate not found
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        //  send email only from backend, job already populated above
        if (status === "Interview") {
            try {
                const job = candidate.jobId;
                const sender = process.env.SMTP_FROM_NAME || "Recruiting Team";
                const subject = `Interview Invitation - ${job?.title || "Opportunity"}`;

                const html = `
                    <div style="font-family: Arial, sans-serif; color: #111;">
                      <p>Hi ${candidate.name},</p>
                      <p>We are pleased to invite you to an interview${job ? ` for the position of <strong>${job.title}</strong> at <strong>${job.company}</strong>` : ""}.</p>
                      <p>Our recruiting team will contact you shortly with available time slots. Please reply to this email if you have any scheduling constraints.</p>
                      <p>Best regards,<br/>${sender}</p>
                    </div>
                `;

                const text = `Hi ${candidate.name},\n\nYou are invited to an interview${job ? ` for ${job.title} at ${job.company}` : ""}. Our recruiting team will contact you with available slots.\n\nBest regards,\n${sender}`;

                await sendMail({ to: candidate.email, subject, text, html });
            } catch (mailErr) {
                // email failure should NOT fail the status update
                console.error("Failed to send interview mail:", mailErr?.message || mailErr);
            }
        }

        return res.json(candidate);
    } catch (err) {
        console.error("updateCandidateStatus error:", err);
        return res.status(500).json({ message: err.message });
    }
};

// REPARSE RESUME
export const reparseCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findById(id);

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        if (!candidate.resumeUrl) {
            return res.status(400).json({ message: "No resume available for this candidate" });
        }

        const resumeText = await parseResume(candidate.resumeUrl);

        //  warn if resume text came back empty
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(422).json({ message: "Could not extract text from resume" });
        }

        const skills = extractSkills(resumeText);

        const updated = await Candidate.findByIdAndUpdate(
            id,
            { skills },
            { new: true }
        );

        return res.json({ ok: true, skills, updated });
    } catch (err) {
        console.error("reparseCandidate error:", err);
        return res.status(500).json({ message: err.message });
    }
};

// SEARCH CANDIDATES
export const searchCandidates = async (req, res) => {
    try {
        const { search, status, minScore, maxScore, jobId } = req.query;

        let filter = {};

        if (jobId) {
            filter.jobId = jobId;
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { skills: { $in: [search.trim().toLowerCase()] } },
            ];
        }

        if (status) filter.status = status;

        //  handle partial score filters (not just when both are present)
        if (minScore || maxScore) {
            filter.matchScore = {};
            if (minScore) filter.matchScore.$gte = Number(minScore);
            if (maxScore) filter.matchScore.$lte = Number(maxScore);
        }

        const candidates = await Candidate.find(filter).populate("jobId");
        return res.json(candidates);
    } catch (err) {
        console.error("searchCandidates error:", err);
        return res.status(500).json({ message: err.message });
    }
};