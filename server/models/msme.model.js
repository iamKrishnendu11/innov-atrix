import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const msmeSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    businessType: { type: String, required: true },
    password:     { type: String, required: true },
    refreshToken: { type: String },
}, { timestamps: true });

// Hash password before saving
msmeSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare hashed passwords
msmeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
msmeSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, role: "msme" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
    );
};

// Generate Refresh Token
msmeSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
    );
};

export const Msme = mongoose.model("Msme", msmeSchema);
