import { Router } from "express";
import {
    createBounty,
    getAllBounties,
    getMyBounties,
    getBountyById,
} from "../controllers/bounty.controller.js";

const router = Router();

router.get("/",       getAllBounties);    // students — all open
router.get("/my",     getMyBounties);    // MSME — their own bounties
router.get("/:id",    getBountyById);    // single detail
router.post("/",      createBounty);     // MSME — create bounty

export default router;
