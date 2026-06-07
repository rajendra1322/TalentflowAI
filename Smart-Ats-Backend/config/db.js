import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error("DB Error:", error.message || error);
    process.exit(1); // stop server if DB fails — no point running without DB
  }
};