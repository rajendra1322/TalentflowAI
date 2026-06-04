import express from "express";
import {
  addCandidate,
  getCandidates,
  updateCandidateStatus,
  searchCandidates,
  reparseCandidate,
} from "../controllers/candidateController.js";

import { upload } from "../middleware/uploads.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// CREATE CANDIDATE (WITH RESUME UPLOAD)
router.post("/", upload.single("resume"), addCandidate);

// GET ALL CANDIDATES
router.get("/", getCandidates);

// SEARCH CANDIDATES
router.get("/search", searchCandidates);

// UPDATE STATUS (protected)
router.put("/:id/status", protect, requireRole(["recruiter", "hiringmanager", "admin"]), updateCandidateStatus);

// REPARSE RESUME
router.post("/:id/reparse", reparseCandidate);

export default router;