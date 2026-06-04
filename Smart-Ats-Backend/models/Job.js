import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,

  company: String,

  location: String,

  description: String,

  skills: [String],

  status: {
    type: String,
    default: "Active",
  },
});

export default mongoose.model("Job", jobSchema);