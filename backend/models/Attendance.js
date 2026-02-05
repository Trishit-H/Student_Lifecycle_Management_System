import mongoose from "mongoose";

/*
  Attendance for a course on a specific date
*/
const attendanceSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["PRESENT", "ABSENT"], required: true },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
