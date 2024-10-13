import express from "express";
import {
  submitSolution,
  getSubmissions,
  getSubmissionById,
  getSubmissionsByProblemId, // Import the new function
} from "../controllers/submissionController.js";
import auth from "../middleware/auth.js"; // Assuming you have an auth middleware
import uniqueSubmissionCheck from "../middleware/uniqueSubmissionCheck.js";

const router = express.Router();

router.post("/submit", auth, uniqueSubmissionCheck, submitSolution);
router.get("/user", auth, getSubmissions);
router.get("/:submissionId", auth, getSubmissionById);
router.get("/problem/:problemId", auth, getSubmissionsByProblemId);

export default router;
