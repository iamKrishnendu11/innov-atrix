import { Application } from "../models/application.model.js";
import { Task } from "../models/task.model.js";
import { calculateTrustScore } from "../utils/trustScore.js";

// ── Student: Apply to a task
export const applyToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const studentId = req.userId; // injected via verifyJWT

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Check if already applied
        const existing = await Application.findOne({ task: taskId, studentId });
        if (existing) {
            return res.status(400).json({ message: "You have already applied to this task" });
        }

        const app = await Application.create({
            task: taskId,
            msme: task.createdBy,
            studentId,
            studentName: req.user.name,
            studentUsername: req.user.username,
            notes: req.body.notes || ""
        });

        return res.status(201).json({ message: "Applied successfully", application: app });
    } catch (err) {
        console.error("applyToTask error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── MSME: Get applications for their tasks
export const getMsmeApplications = async (req, res) => {
    try {
        const msmeId = req.msmeId; // from verifyMsmeJWT
        const applications = await Application.find({ msme: msmeId })
            .populate("studentId", "name username profileScore tasksCompleted bountiesCompleted rating skills description")
            .populate("task", "title skill description budget status")
            .lean();

        // Calculate custom trust score and embed in the output
        const scoredApplications = applications.map(app => {
            const trustScore = calculateTrustScore(app.studentId, app.task);
            return {
                ...app,
                studentName: app.studentId?.name || app.studentName,
                studentUsername: app.studentId?.username || app.studentUsername,
                trustScore
            };
        });

        // Sort dynamically so highest Trust Score appears at the top
        scoredApplications.sort((a, b) => b.trustScore - a.trustScore);

        return res.json({ applications: scoredApplications });
    } catch (err) {
        console.error("getMsmeApplications error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── MSME: Update application status (Accept / Decline)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'accepted' | 'declined'

        const app = await Application.findById(id);
        if (!app) return res.status(404).json({ message: "Application not found" });

        if (app.msme.toString() !== req.msmeId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        app.status = status;
        await app.save();

        // If accepted, optionally decline others or update task status
        if (status === "accepted") {
            // Close the task
            await Task.findByIdAndUpdate(app.task, { status: "closed" });
            // Decline all other pending applications for this task
            await Application.updateMany(
                { task: app.task, _id: { $ne: app._id }, status: "pending" },
                { status: "declined" }
            );
        }

        return res.json({ message: "Status updated successfully", application: app });
    } catch (err) {
        console.error("updateApplicationStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
