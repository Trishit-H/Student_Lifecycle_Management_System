import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import admissionRoutes from "./routes/admission.routes.js";
import courseRoutes from "./routes/course.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Testing a protected route
import protect from "./middleware/auth.middleware.js";

app.get("/api/test/protected", protect, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

// Testing a role based route
import allowRoles from "./middleware/role.middleware.js";

app.get(
    "/api/test/admin",
    protect,
    allowRoles("ADMIN"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/courses", courseRoutes);

export default app;
