import mongoose from "mongoose";

/*
  Admins usually don't need much profile data
  This is mostly for consistency
*/
const adminProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        office: {
            type: String,
            default: "Admin Office"
        }
    },
    { timestamps: true }
);

export default mongoose.model("AdminProfile", adminProfileSchema);
