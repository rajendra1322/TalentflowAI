import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // normalize role (accept lowercase from client like 'candidate')
    const allowedRoles = ["candidate", "recruiter", "admin"];

    const normalizedRole =
      role && allowedRoles.includes(role.toLowerCase())
        ? role.toLowerCase()
        : "recruiter";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    res.status(201).json({
      message: "Registered Successfully",
    });

  } catch (error) {
    // Mongoose validation error -> 400
    if (error && error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    // Duplicate key error
    if (error && error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered" });
    }

    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};