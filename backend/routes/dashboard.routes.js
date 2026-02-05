import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getAdminDashboard, getFacultyDashboard, getStudentDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

// Admin dashboard
router.get("/admin", protect, getAdminDashboard);

// Faculty dashboard
router.get("/faculty", protect, getFacultyDashboard);

// Student dashboard
router.get("/student", protect, getStudentDashboard);

export default router;
