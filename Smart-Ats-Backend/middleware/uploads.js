import multer from "multer";

// Use memory storage so files are available as buffers for cloud upload
const storage = multer.memoryStorage();

export const upload = multer({ storage });