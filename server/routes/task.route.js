import { Router } from "express";
import {
    createTask,
    getAllTasks,
    getMyTasks,
    getTaskById,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/",       getAllTasks);    // students — all open
router.get("/my",     getMyTasks);     // MSME — their own tasks
router.get("/:id",    getTaskById);    // single detail
router.post("/",      createTask);     // MSME — create task

export default router;
