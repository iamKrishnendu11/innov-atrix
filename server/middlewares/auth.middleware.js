import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        // Accept token from cookie OR Authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Token expired or invalid" });
    }
};

// Never blocks — just populates req.user if a valid token is present
export const optionalVerifyJWT = async (req, _res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id).select("-password -refreshToken");
            if (user) req.user = user;
        }
    } catch (_) { /* ignore invalid / missing tokens */ }
    next();
};
