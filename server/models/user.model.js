import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { calculateProfileScore } from "../utils/profileScore.js";

const userSchema = new mongoose.Schema({
    // Form 1 fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    
    // Form 2 fields
    description: { type: String, default: "" },
    skills: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    pastExperiences: { type: String, default: "" },
    portfolioLink: { type: String, default: "" },

    // Computed profile score (0–100)
    profileScore: { type: Number, default: 0 },
    profileScoreBreakdown: {
        skills: { score: { type: Number, default: 0 }, max: { type: Number, default: 35 } },
        description: { score: { type: Number, default: 0 }, max: { type: Number, default: 30 } },
        pastExperiences: { score: { type: Number, default: 0 }, max: { type: Number, default: 35 } },
    },

    // Tracking activity
    earnings:           { type: Number, default: 0 },
    bountiesCompleted:  { type: Number, default: 0 },
    tasksCompleted:     { type: Number, default: 0 },
    rating:             { type: Number, default: 0 },

    refreshToken: { type: String }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Auto-recalculate profile score whenever relevant fields change
userSchema.pre("save", function () {
    const profileFields = ["skills", "description", "pastExperiences"];
    const needsRecalc = profileFields.some((f) => this.isModified(f)) || this.isNew;
    if (!needsRecalc) return;

    const result = calculateProfileScore({
        skills: this.skills,
        description: this.description,
        pastExperiences: this.pastExperiences,
    });

    this.profileScore = result.total;
    this.profileScoreBreakdown = result.breakdown;
});

// Compare hashed passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
    );
};

export const User = mongoose.model("User", userSchema);
