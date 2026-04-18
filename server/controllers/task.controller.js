import { Task } from "../models/task.model.js";
import { Msme } from "../models/msme.model.js";
import jwt from "jsonwebtoken";

// ── Helper: get MSME from token ───────────────────────────────────────────────
async function getMsmeFromToken(req) {
    const token =
        req.cookies?.msme_accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return await Msme.findById(decoded._id).select("-password -refreshToken");
    } catch {
        return null;
    }
}

// ── POST /api/tasks  (MSME creates a task) ────────────────────────────────────
export const createTask = async (req, res) => {
    try {
        const msme = await getMsmeFromToken(req);
        if (!msme)
            return res.status(401).json({ message: "Unauthorized" });

        const { title, description, budget, skill, deadline } = req.body;

        if (!title || !description || !budget || !skill) {
            return res.status(400).json({ message: "title, description, budget and skill are required" });
        }

        const task = await Task.create({
            title,
            description,
            budget: Number(budget),
            skill,
            deadline: deadline ? new Date(deadline) : undefined,
            msme: msme._id,
            msmeBusinessName: msme.businessName,
        });

        return res.status(201).json({ message: "Task created", task });
    } catch (err) {
        console.error("createTask error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/tasks  (students browse all open tasks) ──────────────────────────
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ status: "open" })
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ tasks });
    } catch (err) {
        console.error("getAllTasks error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/tasks/my  (MSME sees their own tasks) ────────────────────────────
export const getMyTasks = async (req, res) => {
    try {
        const msme = await getMsmeFromToken(req);
        if (!msme)
            return res.status(401).json({ message: "Unauthorized" });

        const tasks = await Task.find({ msme: msme._id })
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ tasks });
    } catch (err) {
        console.error("getMyTasks error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/tasks/:id  (single task detail) ──────────────────────────────────
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).lean();
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json({ task });
    } catch (err) {
        console.error("getTaskById error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
