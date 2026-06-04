import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Candidate from '../models/Candidates.js';

const uploadsDir = path.join(process.cwd(), 'uploads');

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Cloudinary env vars are not set. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to your .env');
    process.exit(1);
  }

  const { uploadBuffer } = await import('../utils/cloudinary.js');

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  if (!fs.existsSync(uploadsDir)) {
    console.log('No uploads directory found, nothing to backfill.');
    process.exit(0);
  }

  const files = fs.readdirSync(uploadsDir).filter(f => !f.startsWith('.'));

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    console.log('Processing', filePath);

    try {
      const buffer = fs.readFileSync(filePath);
      const result = await uploadBuffer(buffer, { folder: 'resumes' });
      const url = result?.secure_url;

      if (url) {
        // Update any candidate documents that reference this local path
        const localRef1 = `uploads/${file}`;
        const localRef2 = filePath;

        const res = await Candidate.updateMany(
          { resumeUrl: { $in: [localRef1, localRef2] } },
          { $set: { resumeUrl: url } }
        );

        console.log(`Uploaded ${file} -> ${url}. Updated ${res.modifiedCount} candidates.`);

        // Optionally remove local file
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      } else {
        console.warn('Upload returned no URL for', file);
      }
    } catch (err) {
      console.error('Failed processing', file, err.message || err);
    }
  }

  console.log('Backfill complete');
  process.exit(0);
}

main().catch(err => {
  console.error('Backfill script error', err);
  process.exit(1);
});
