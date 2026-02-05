import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Course from "../models/Course.js";

/* Faculty marks attendance for a student in their course */
export const markAttendance = async (req, res) => {
    try {
        const { courseId, studentId, status } = req.body;

        // Check faculty permission
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.faculty.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Check if student is enrolled
        if (!course.students.includes(studentId)) {
            return res.status(400).json({ message: "Student not enrolled" });
        }

        const attendance = await Attendance.create({
            course: courseId,
            student: studentId,
            status
        });

        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Faculty assigns grade */
export const assignGrade = async (req, res) => {
    try {
        const { courseId, studentId, grade, remarks } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.faculty.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Check if student is enrolled
        if (!course.students.includes(studentId)) {
            return res.status(400).json({ message: "Student not enrolled" });
        }

        const newGrade = await Grade.create({ course: courseId, student: studentId, grade, remarks });
        res.json(newGrade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Student views their attendance & grades */
export const getStudentAcademic = async (req, res) => {
    try {
        if (req.user.role !== "STUDENT") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const attendance = await Attendance.find({ student: req.user.id }).populate("course", "courseName courseCode");
        const grades = await Grade.find({ student: req.user.id }).populate("course", "courseName courseCode");

        res.json({ attendance, grades });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Admin can view all academic records (optional) */
export const getAllAcademic = async (req, res) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const attendance = await Attendance.find().populate("student", "name enrollmentNumber").populate("course", "courseName");
        const grades = await Grade.find().populate("student", "name enrollmentNumber").populate("course", "courseName");

        res.json({ attendance, grades });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
