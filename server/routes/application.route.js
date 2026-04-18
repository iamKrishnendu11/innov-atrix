import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyMsmeJWT } from "../middlewares/msmeAuth.middleware.js";
import {
    applyToTask,
    getMsmeApplications,
    updateApplicationStatus
} from "../controllers/application.controller.js";

const router = express.Router();

// Student routes
router.post("/:taskId", verifyJWT, applyToTask);

// MSME routes
router.get("/msme", verifyMsmeJWT, getMsmeApplications);
router.patch("/:id/status", verifyMsmeJWT, updateApplicationStatus);

export default router;
