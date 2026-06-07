import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job reference is required"],
    },

    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"],
      default: "Applied",
    },

    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    recommendation: {
      type: String,
      default: "",
    },

    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// compound index — prevents same email applying to same job twice
candidateSchema.index({ email: 1, jobId: 1 }, { unique: true });

export default mongoose.model("Candidate", candidateSchema);