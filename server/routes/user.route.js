import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getCurrentUser);
router.put("/profile", verifyJWT, updateProfile);

export default router;
