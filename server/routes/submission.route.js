import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyMsmeJWT } from "../middlewares/msmeAuth.middleware.js";
import {
    createSubmission,
    getMsmeSubmissions,
    updateSubmissionStatus,
    getSubmissionById,
} from "../controllers/submission.controller.js";

const router = express.Router();

// Student routes (protected by normal JWT)
router.post("/:bountyId", verifyJWT, createSubmission);

// MSME routes (protected by MSME JWT)
router.get("/msme", verifyMsmeJWT, getMsmeSubmissions);
router.get("/:id", verifyMsmeJWT, getSubmissionById);
router.patch("/:id/status", verifyMsmeJWT, updateSubmissionStatus);

export default router;
