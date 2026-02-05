import mongoose from "mongoose";

/*
  Hostel allocation for a student
*/
const hostelSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        hostelName: { type: String, required: true },
        roomNumber: { type: String, required: true },
        status: { type: String, enum: ["ALLOCATED", "VACATED"], default: "ALLOCATED" }
    },
    { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);
