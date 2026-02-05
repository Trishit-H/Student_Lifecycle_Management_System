import mongoose from "mongoose";

/*
  AdmissionApplication represents a pre-enrollment student.
  One application per applicant (user).
*/
const admissionApplicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true // one application per user
        },

        fullName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        previousQualification: {
            type: String,
            required: true
        },

        desiredProgram: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING"
        }
    },
    { timestamps: true }
);

export default mongoose.model(
    "AdmissionApplication",
    admissionApplicationSchema
);
