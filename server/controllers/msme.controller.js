import { Msme } from "../models/msme.model.js";

const generateTokens = async (msmeId) => {
    try {
        const msme = await Msme.findById(msmeId);
        const accessToken = msme.generateAccessToken();
        const refreshToken = msme.generateRefreshToken();

        msme.refreshToken = refreshToken;
        await msme.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens");
    }
};

export const registerMsme = async (req, res) => {
    try {
        const { businessName, email, businessType, password } = req.body;

        if (!businessName || !email || !businessType || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingMsme = await Msme.findOne({ email });
        if (existingMsme) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const msme = await Msme.create({ businessName, email, businessType, password });

        const createdMsme = await Msme.findById(msme._id).select("-password -refreshToken");

        return res.status(201).json({
            message: "MSME registered successfully",
            msme: createdMsme,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error during registration" });
    }
};

export const loginMsme = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const msme = await Msme.findOne({ email });
        if (!msme) {
            return res.status(404).json({ message: "No account found with this email" });
        }

        const isPasswordValid = await msme.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = await generateTokens(msme._id);

        const loggedInMsme = await Msme.findById(msme._id).select("-password -refreshToken");

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(200)
            .cookie("msme_accessToken", accessToken, cookieOptions)
            .cookie("msme_refreshToken", refreshToken, cookieOptions)
            .json({
                message: "Logged in successfully",
                msme: loggedInMsme,
                accessToken,
                refreshToken,
            });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error during login" });
    }
};

export const logoutMsme = async (req, res) => {
    try {
        await Msme.findByIdAndUpdate(
            req.msme._id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(200)
            .clearCookie("msme_accessToken", cookieOptions)
            .clearCookie("msme_refreshToken", cookieOptions)
            .json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error during logout" });
    }
};
