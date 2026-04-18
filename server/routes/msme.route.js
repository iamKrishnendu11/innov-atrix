import { Router } from "express";
import { registerMsme, loginMsme, logoutMsme } from "../controllers/msme.controller.js";

const router = Router();

router.post("/register", registerMsme);
router.post("/login", loginMsme);
router.post("/logout", logoutMsme);

export default router;
