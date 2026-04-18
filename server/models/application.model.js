import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
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
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
        notes: { type: String }, // Optional notes
    },
    { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
