import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
    createProfile,
    getMyProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

/*
  Logged-in user creates their own profile
*/
router.post("/me", protect, createProfile);

/*
  Logged-in user fetches their own profile
*/
router.get("/me", protect, getMyProfile);

export default router;
