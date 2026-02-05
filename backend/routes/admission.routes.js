import express from "express";
import protect from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

import {
    applyForAdmission,
    getAllApplications,
    approveApplication
} from "../controllers/admission.controller.js";

const router = express.Router();

/*
  Applicant submits admission form
*/
router.post(
    "/apply",
    protect,
    allowRoles("APPLICANT"),
    applyForAdmission
);

/*
  Admin views all applications
*/
router.get(
    "/",
    protect,
    allowRoles("ADMIN"),
    getAllApplications
);

/*
  Admin approves an application
*/
router.patch(
    "/:id/approve",
    protect,
    allowRoles("ADMIN"),
    approveApplication
);

export default router;
