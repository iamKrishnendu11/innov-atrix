import { Submission } from "../models/submission.model.js";
import { Bounty } from "../models/bounty.model.js";
import { User } from "../models/user.model.js";

// ── GET /api/submissions/bounty/:bountyId  (Student — public count + own submission) ──
export const getSubmissionsByBounty = async (req, res) => {
    try {
        const { bountyId } = req.params;
        const totalCount = await Submission.countDocuments({ bounty: bountyId });
        let mySubmission = null;
        if (req.user) {
            mySubmission = await Submission.findOne({ bounty: bountyId, studentId: req.user._id }).lean();
        }
        return res.json({ totalCount, mySubmission });
    } catch (err) {
        console.error("getSubmissionsByBounty error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/submissions/my  (Student — their own submissions with bounty info) ─
export const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ studentId: req.user._id })
            .populate("bounty", "title budget status")
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ submissions });
    } catch (err) {
        console.error("getMySubmissions error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

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

        // If accepted:
        // 1. Auto-decline all other pending for this bounty
        // 2. Credit student's earnings & increment bounty count
        // 3. Close the bounty
        if (status === "accepted") {
            await Submission.updateMany(
                { bounty: submission.bounty, _id: { $ne: submission._id }, status: "pending" },
                { $set: { status: "declined" } }
            );

            // Credit student
            const bountyDoc = await Bounty.findById(submission.bounty);
            if (bountyDoc) {
                await User.findByIdAndUpdate(submission.studentId, {
                    $inc: {
                        earnings: bountyDoc.budget,
                        bountiesCompleted: 1,
                    },
                });
                // Close bounty so it disappears from marketplace
                bountyDoc.status = "closed";
                await bountyDoc.save();
            }
        }

        return res.json({ message: `Submission ${status}`, submission });
    } catch (err) {
        console.error("updateSubmissionStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
