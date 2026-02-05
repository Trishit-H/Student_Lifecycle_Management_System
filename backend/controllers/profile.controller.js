import StudentProfile from "../models/StudentProfile.js";
import FacultyProfile from "../models/FacultyProfile.js";
import AdminProfile from "../models/AdminProfile.js";

/*
  Create profile based on logged-in user's role
*/
export const createProfile = async (req, res) => {
    const role = req.user.role;
    const userId = req.user.id;

    try {
        // Applicants are not allowed to create profiles
        if (req.user.role === "APPLICANT") {
            return res
                .status(403)
                .json({ message: "Admission not approved yet" });
        }


        // STUDENT
        if (role === "STUDENT") {
            return res
                .status(403)
                .json({ message: "Profile already created automatically after approval" });
        }


        // FACULTY
        if (role === "FACULTY") {
            const profile = await FacultyProfile.create({
                userId,
                employeeId: req.body.employeeId,
                department: req.body.department,
                designation: req.body.designation
            });
            return res.status(201).json(profile);
        }

        // ADMIN
        if (role === "ADMIN") {
            const profile = await AdminProfile.create({
                userId,
                office: req.body.office
            });
            return res.status(201).json(profile);
        }

        res.status(400).json({ message: "Invalid role" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
  Get logged-in user's profile
*/
export const getMyProfile = async (req, res) => {
    const role = req.user.role;
    const userId = req.user.id;

    let profile;

    if (role === "STUDENT") {
        profile = await StudentProfile.findOne({ userId });
    } else if (role === "FACULTY") {
        profile = await FacultyProfile.findOne({ userId });
    } else if (role === "ADMIN") {
        profile = await AdminProfile.findOne({ userId });
    }

    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
};
