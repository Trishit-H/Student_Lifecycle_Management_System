import AdmissionApplication from "../models/AdmissionApplication.js";
import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

/*
  Applicant submits admission application
*/
export const applyForAdmission = async (req, res) => {
    try {
        const existingApplication = await AdmissionApplication.findOne({
            userId: req.user.id
        });

        // Prevent multiple applications
        if (existingApplication) {
            return res
                .status(400)
                .json({ message: "Application already submitted" });
        }

        const application = await AdmissionApplication.create({
            userId: req.user.id,
            fullName: req.body.fullName,
            email: req.body.email,
            previousQualification: req.body.previousQualification,
            desiredProgram: req.body.desiredProgram
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
  Admin fetches all applications
*/
export const getAllApplications = async (req, res) => {
    const applications = await AdmissionApplication.find()
        .populate("userId", "email role");

    res.json(applications);
};

/*
  Admin approves application
  - Application status updated
  - User role upgraded to STUDENT
  - Enrollment number assigned automatically
  - StudentProfile created automatically
*/
export const approveApplication = async (req, res) => {
    try {
        const application = await AdmissionApplication.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Prevent double approval
        if (application.status === "APPROVED") {
            return res.status(400).json({ message: "Application already approved" });
        }

        // Assign enrollment number (example logic: AMUYYYYCSE###)
        const randomNumber = Math.floor(100 + Math.random() * 900); // 3-digit
        const enrollmentNo = `AMU${new Date().getFullYear()}CSE${randomNumber}`;

        // Update application status
        application.status = "APPROVED";
        application.enrollmentNumber = enrollmentNo;
        await application.save();

        // Upgrade user role
        const user = await User.findById(application.userId);
        user.role = "STUDENT";
        await user.save();

        // Auto-create StudentProfile
        const profile = await StudentProfile.create({
            userId: user._id,
            enrollmentNumber: enrollmentNo,
            department: application.desiredProgram, // you can map program → dept if needed
            semester: 1
        });

        res.json({
            message: "Application approved, user is now a STUDENT",
            enrollmentNumber: enrollmentNo,
            profile
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};