import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        bounty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bounty",
            required: true,
        },
        msme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Msme",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        studentName: { type: String, required: true },
        studentUsername: { type: String, required: true },
        workLink: { type: String, required: true },
        notes: { type: String },
        images: [{ type: String }],
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);
