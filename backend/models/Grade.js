import mongoose from "mongoose";

/*
  Grade for a student in a course
*/
const gradeSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        grade: { type: String, enum: ["A+", "A", "B", "C", "D", "F"], required: true },
        remarks: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);
