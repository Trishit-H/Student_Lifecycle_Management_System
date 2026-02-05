import User from "../models/User.js";
import AdmissionApplication from "../models/AdmissionApplication.js";
import StudentProfile from "../models/StudentProfile.js";
import Course from "../models/Course.js";
import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Hostel from "../models/Hostel.js";

/* Admin Dashboard */
export const getAdminDashboard = async (req, res) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const totalStudents = await User.countDocuments({ role: "STUDENT" });
        const totalApplicants = await AdmissionApplication.countDocuments({ status: "PENDING" });
        const totalCourses = await Course.countDocuments();
        const totalHostels = await Hostel.countDocuments();

        // Optional: Attendance summary
        const totalAttendanceRecords = await Attendance.countDocuments();
        const totalGrades = await Grade.countDocuments();

        res.json({
            totalStudents,
            totalApplicants,
            totalCourses,
            totalHostels,
            totalAttendanceRecords,
            totalGrades
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Faculty Dashboard */
export const getFacultyDashboard = async (req, res) => {
    try {
        if (req.user.role !== "FACULTY") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const courses = await Course.find({ faculty: req.user.id }).populate("students", "name enrollmentNumber");

        // For each course: total students, attendance summary
        const courseSummary = await Promise.all(
            courses.map(async course => {
                const attendanceCount = await Attendance.countDocuments({ course: course._id });
                const gradesCount = await Grade.countDocuments({ course: course._id });
                return {
                    courseId: course._id,
                    courseName: course.courseName,
                    totalStudents: course.students.length,
                    attendanceRecords: attendanceCount,
                    gradesAssigned: gradesCount
                };
            })
        );

        res.json(courseSummary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Student Dashboard */
export const getStudentDashboard = async (req, res) => {
    try {
        if (req.user.role !== "STUDENT") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const profile = await StudentProfile.findOne({ userId: req.user.id });
        const courses = await Course.find({ students: req.user.id }).select("courseName courseCode");
        const attendance = await Attendance.find({ student: req.user.id }).populate("course", "courseName courseCode");
        const grades = await Grade.find({ student: req.user.id }).populate("course", "courseName courseCode");
        const hostel = await Hostel.findOne({ student: req.user.id });

        res.json({
            profile,
            courses,
            attendance,
            grades,
            hostel
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
