import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: String,

    resumeUrl: String,

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected"
      ],
      default: "Applied"
    },
    matchScore: {
      type: Number,
      default: 0,
    },

    recommendation: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);