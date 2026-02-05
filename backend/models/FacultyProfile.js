import mongoose from "mongoose";

/*
  Faculty profile linked to a User with role FACULTY
*/
const facultyProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        employeeId: {
            type: String,
            required: true,
            unique: true
        },

        department: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("FacultyProfile", facultyProfileSchema);
