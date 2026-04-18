import { Bounty } from "../models/bounty.model.js";
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

// ── POST /api/bounties  (MSME creates a bounty) ───────────────────────────────
export const createBounty = async (req, res) => {
    try {
        const msme = await getMsmeFromToken(req);
        if (!msme)
            return res.status(401).json({ message: "Unauthorized" });

        const { title, description, budget, skill, deadline } = req.body;

        if (!title || !description || !budget || !skill) {
            return res.status(400).json({ message: "title, description, budget and skill are required" });
        }

        const bounty = await Bounty.create({
            title,
            description,
            budget: Number(budget),
            skill,
            deadline: deadline ? new Date(deadline) : undefined,
            msme: msme._id,
            msmeBusinessName: msme.businessName,
        });

        return res.status(201).json({ message: "Bounty created", bounty });
    } catch (err) {
        console.error("createBounty error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/bounties  (students browse all open bounties) ───────────────────
export const getAllBounties = async (req, res) => {
    try {
        const bounties = await Bounty.find({ status: "open" })
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ bounties });
    } catch (err) {
        console.error("getAllBounties error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/bounties/my  (MSME sees their own bounties) ─────────────────────
export const getMyBounties = async (req, res) => {
    try {
        const msme = await getMsmeFromToken(req);
        if (!msme)
            return res.status(401).json({ message: "Unauthorized" });

        const bounties = await Bounty.find({ msme: msme._id })
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ bounties });
    } catch (err) {
        console.error("getMyBounties error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// ── GET /api/bounties/:id  (single bounty detail) ────────────────────────────
export const getBountyById = async (req, res) => {
    try {
        const bounty = await Bounty.findById(req.params.id).lean();
        if (!bounty) return res.status(404).json({ message: "Bounty not found" });
        return res.json({ bounty });
    } catch (err) {
        console.error("getBountyById error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
