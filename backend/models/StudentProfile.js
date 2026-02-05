import mongoose from "mongoose";

/*
  Each student profile is linked to exactly ONE user
  role must be STUDENT (enforced at route level)
*/
const studentProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        enrollmentNumber: {
            type: String,
            required: true,
            unique: true
        },

        department: {
            type: String,
            required: true
        },

        semester: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
