import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import msmeRouter from "./routes/msme.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes declaration
app.use("/api/users", userRouter);
app.use("/api/msme", msmeRouter);

const PORT = process.env.PORT || 5001;
await connectDB();
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});