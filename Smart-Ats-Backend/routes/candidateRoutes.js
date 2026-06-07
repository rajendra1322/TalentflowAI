import express from "express";
import {
  addCandidate,
  getCandidates,
  updateCandidateStatus,
  searchCandidates,
  reparseCandidate,
} from "../controllers/candidateController.js";

import { upload } from "../middleware/uploads.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE CANDIDATE (WITH RESUME UPLOAD)
//  public — candidates apply without an account
router.post("/", upload.single("resume"), addCandidate);

// GET ALL CANDIDATES
//  protected — only logged in staff can view all candidates
router.get("/", protect, getCandidates);

// SEARCH CANDIDATES
// protected — same as above
router.get("/search", protect, searchCandidates);

// UPDATE STATUS
//  protected — only recruiters, hiring managers, admins
router.put(
  "/:id/status",
  protect,
  requireRole(["recruiter", "hiringmanager", "admin"]),
  updateCandidateStatus
);

// REPARSE RESUME
// protected — only logged in staff
router.post("/:id/reparse", protect, requireRole(["recruiter", "hiringmanager", "admin"]), reparseCandidate);

export default router;