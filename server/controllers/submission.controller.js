import { Submission } from "../models/submission.model.js";
import { Bounty } from "../models/bounty.model.js";

// ── GET /api/submissions/:id  (MSME views a single submission) ────────────────
export const getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findById(id)
            .populate("bounty", "title budget deadline")
            .lean();
        if (!submission) return res.status(404).json({ message: "Submission not found" });

        // Ensure MSME owns this submission
        if (submission.msme.toString() !== req.msme._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        return res.json({ submission });
    } catch (err) {
        console.error("getSubmissionById error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── POST /api/submissions/:bountyId  (Student creates a submission) ───────────
export const createSubmission = async (req, res) => {
    try {
        const { bountyId } = req.params;
        const { workLink, notes } = req.body;
        
        if (!workLink) {
            return res.status(400).json({ message: "Work link is required" });
        }

        const bounty = await Bounty.findById(bountyId);
        if (!bounty) return res.status(404).json({ message: "Bounty not found" });

        // Remove image array
        const imageUrls = [];

        const submission = await Submission.create({
            bounty: bountyId,
            msme: bounty.msme,
            studentId: req.user._id,
            studentName: req.user.name || "Student",
            studentUsername: req.user.username || `@${req.user.name?.replace(/\s/g, '').toLowerCase() || 'student'}`,
            workLink,
            notes,
            images: imageUrls,
        });

        return res.status(201).json({ message: "Submission successful", submission });
    } catch (err) {
        console.error("createSubmission error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/submissions/msme  (MSME fetches all their submissions) ───────────
export const getMsmeSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ msme: req.msme._id }).sort({ createdAt: 1 }).lean();
        return res.json({ submissions });
    } catch (err) {
        console.error("getMsmeSubmissions error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── PATCH /api/submissions/:id/status  (MSME accepts/declines) ────────────────
export const updateSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'accepted' or 'declined'

        const submission = await Submission.findById(id);
        if (!submission) return res.status(404).json({ message: "Submission not found" });

        // Ensure MSME owns this submission
        if (submission.msme.toString() !== req.msme._id.toString()) {
            return res.status(403).json({ message: "Unauthorized MSME access" });
        }

        submission.status = status;
        await submission.save();

        // If accepted, auto-decline all other pending submissions for this bounty
        if (status === "accepted") {
            await Submission.updateMany(
                { bounty: submission.bounty, _id: { $ne: submission._id }, status: "pending" },
                { $set: { status: "declined" } }
            );
            // Optionally set Bounty to closed
            await Bounty.findByIdAndUpdate(submission.bounty, { status: "closed" });
        }

        return res.json({ message: `Submission ${status}`, submission });
    } catch (err) {
        console.error("updateSubmissionStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
