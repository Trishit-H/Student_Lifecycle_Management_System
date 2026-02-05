import Hostel from "../models/Hostel.js";
import User from "../models/User.js";

/* Admin assigns hostel to a student */
export const assignHostel = async (req, res) => {
    try {
        const { studentId, hostelName, roomNumber } = req.body;

        // Ensure student exists and is approved
        const student = await User.findById(studentId);
        if (!student || student.role !== "STUDENT") {
            return res.status(400).json({ message: "Invalid or unapproved student" });
        }

        // Prevent duplicate hostel allocation
        const existing = await Hostel.findOne({ student: studentId });
        if (existing) {
            return res.status(400).json({ message: "Hostel already assigned" });
        }

        const hostel = await Hostel.create({ student: studentId, hostelName, roomNumber });
        res.json(hostel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Student views own hostel allocation */
export const getMyHostel = async (req, res) => {
    try {
        if (req.user.role !== "STUDENT") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const hostel = await Hostel.findOne({ student: req.user.id });
        if (!hostel) return res.status(404).json({ message: "No hostel assigned" });

        res.json(hostel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
