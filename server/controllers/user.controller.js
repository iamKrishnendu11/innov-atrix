import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens");
    }
}

export const registerUser = async (req, res) => {
    try {
        const { 
            name, email, phone, password, 
            description, skills, githubUrl, linkedinUrl, pastExperiences, portfolioLink 
        } = req.body;

        console.log("REACHED BACKEND SIGNUP. req.body:", req.body);

        // Validation for Form 1 required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Form 1 fields (name, email, phone, password) are required" });
        }

        // Check if user exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        // Create user with both forms' data
        const user = await User.create({
            name, email, phone, password,
            description, skills, githubUrl, linkedinUrl, pastExperiences, portfolioLink
        });

        // Remove sensitive info for response
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201).json({ message: "User registered successfully", user: createdUser });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error during registration" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Verify password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error during login" });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // req.user is attached by verifyJWT middleware
        return res.status(200).json({ user: req.user });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error fetching user" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { description, skills, githubUrl, linkedinUrl, pastExperiences, portfolioLink } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update only the fields that were provided
        if (description   !== undefined) user.description    = description;
        if (skills        !== undefined) user.skills         = skills;
        if (githubUrl     !== undefined) user.githubUrl      = githubUrl;
        if (linkedinUrl   !== undefined) user.linkedinUrl    = linkedinUrl;
        if (pastExperiences !== undefined) user.pastExperiences = pastExperiences;
        if (portfolioLink !== undefined) user.portfolioLink  = portfolioLink;

        // profileScore is recalculated automatically by the pre-save hook
        await user.save({ validateBeforeSave: false });

        const updatedUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            profileScore: updatedUser.profileScore,
            profileScoreBreakdown: updatedUser.profileScoreBreakdown,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error updating profile" });
    }
};
