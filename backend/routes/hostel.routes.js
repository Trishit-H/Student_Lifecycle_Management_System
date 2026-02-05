import express from "express";
import protect from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";
import { assignHostel, getMyHostel } from "../controllers/hostel.controller.js";

const router = express.Router();

// Admin assigns hostel
router.post("/assign", protect, allowRoles("ADMIN"), assignHostel);

// Student views their own hostel allocation
router.get("/me", protect, allowRoles("STUDENT"), getMyHostel);

export default router;
