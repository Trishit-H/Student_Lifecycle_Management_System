import mongoose from "mongoose";

/*
  Course:
  - Created by Admin
  - Assigned to one or more faculty
  - Students can enroll
*/
const courseSchema = new mongoose.Schema(
    {
        courseCode: { type: String, required: true, unique: true },
        courseName: { type: String, required: true },
        description: { type: String },

        // Faculty assigned to this course
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Students enrolled
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
