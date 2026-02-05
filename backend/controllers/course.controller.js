import Course from "../models/Course.js";
import User from "../models/User.js";

/*
  Admin creates a course and assigns faculty
*/
export const createCourse = async (req, res) => {
    try {
        const { courseCode, courseName, description, facultyId } = req.body;

        // Check if faculty exists and is actually a faculty
        const faculty = await User.findById(facultyId);
        if (!faculty || faculty.role !== "FACULTY") {
            return res.status(400).json({ message: "Invalid facultyId" });
        }

        const course = await Course.create({
            courseCode,
            courseName,
            description,
            faculty: facultyId
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
  Student enrolls in a course
*/
export const enrollCourse = async (req, res) => {
    try {
        // Only STUDENT role allowed
        if (req.user.role !== "STUDENT") {
            return res.status(403).json({ message: "Only students can enroll" });
        }

        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Check if student already enrolled
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        course.students.push(req.user.id);
        await course.save();

        res.json({ message: "Enrolled successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
  Faculty views their courses and students
*/
export const getFacultyCourses = async (req, res) => {
    try {
        if (req.user.role !== "FACULTY") {
            return res.status(403).json({ message: "Only faculty allowed" });
        }

        const courses = await Course.find({ faculty: req.user.id }).populate(
            "students",
            "name email enrollmentNumber"
        );

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
  Admin views all courses
*/
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("faculty", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
