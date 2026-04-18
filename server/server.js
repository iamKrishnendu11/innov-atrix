import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import msmeRouter from "./routes/msme.route.js";
import bountyRouter from "./routes/bounty.route.js";
import submissionRouter from "./routes/submission.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes declaration
app.use("/api/users",    userRouter);
app.use("/api/msme",     msmeRouter);
app.use("/api/bounties", bountyRouter);
app.use("/api/submissions", submissionRouter);

const PORT = process.env.PORT || 5001;
await connectDB();
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});