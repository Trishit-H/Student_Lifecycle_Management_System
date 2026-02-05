import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// User regeistration
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(201).json({
        token: generateToken(user),
        user: {
            id: user._id,
            name: user.name,
            role: user.role
        }
    });
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
        token: generateToken(user),
        user: {
            id: user._id,
            name: user.name,
            role: user.role
        }
    });
};
