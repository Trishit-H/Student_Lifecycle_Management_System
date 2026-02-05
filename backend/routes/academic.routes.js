import express from "express";
import protect from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";
import {
    markAttendance,
    assignGrade,
    getStudentAcademic,
    getAllAcademic
} from "../controllers/academic.controller.js";

const router = express.Router();

// Faculty marks attendance
router.post("/attendance", protect, allowRoles("FACULTY"), markAttendance);

// Faculty assigns grade
router.post("/grade", protect, allowRoles("FACULTY"), assignGrade);

// Student views their own attendance & grades
router.get("/me", protect, allowRoles("STUDENT"), getStudentAcademic);

// Admin views all academic data
router.get("/", protect, allowRoles("ADMIN"), getAllAcademic);

export default router;
