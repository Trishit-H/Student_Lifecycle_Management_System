import express from "express";
import protect from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

import {
    createCourse,
    enrollCourse,
    getFacultyCourses,
    getAllCourses
} from "../controllers/course.controller.js";

const router = express.Router();

// Admin creates a course
router.post("/", protect, allowRoles("ADMIN"), createCourse);

// Student enrolls in a course
router.post("/:courseId/enroll", protect, allowRoles("STUDENT"), enrollCourse);

// Faculty sees their courses
router.get("/faculty", protect, allowRoles("FACULTY"), getFacultyCourses);

// Admin sees all courses
router.get("/", protect, allowRoles("ADMIN"), getAllCourses);

export default router;
