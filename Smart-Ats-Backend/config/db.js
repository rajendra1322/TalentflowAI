import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Error:", error.message || error);
    // Don't exit immediately; let the caller decide. For local dev you may want to exit.
    // process.exit(1);
  }
};