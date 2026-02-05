import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["APPLICANT", "STUDENT", "FACULTY", "ADMIN"],
            default: "APPLICANT"
        }
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
