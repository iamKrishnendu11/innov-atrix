import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:       { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        budget:      { type: Number, required: true, min: 0 },
        skill:       { type: String, required: true },
        deadline:    { type: Date },
        status:      { type: String, enum: ["open", "in_review", "closed"], default: "open" },

        // Posted by MSME
        msme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Msme",
            required: true,
        },
        msmeBusinessName: { type: String },
        msmeVerified:     { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
