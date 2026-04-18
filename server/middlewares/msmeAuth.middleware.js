import jwt from "jsonwebtoken";
import { Msme } from "../models/msme.model.js";

export const verifyMsmeJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.msme_accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const msme = await Msme.findById(decoded._id).select("-password -refreshToken");
        if (!msme) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.msme = msme;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Token expired or invalid" });
    }
};
