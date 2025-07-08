import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwt.js';

/**
 * Registers a new user.
 * - Validates email uniqueness
 * - Hashes password before storing
 * - Assigns default role if not provided
 */
export const registerUser = async (req, res) => {
  const { name, email, password, Role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      Role: Role || "user",
    });

    await newUser.save();

    // Respond with success
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({
      message: "Something went wrong during registration.",
      error: err.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  const {email, password } = req.body;
  try {
    const user = await User.findOne({email}).select('+password');
    if (!user) {
      return res.status(401).json({message: "Invalid email or password"});
    }
    // it compare the passowrd hash that are in database(mongoodb_atlas) if it is match then it will return
    // so the user can login
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Invalid email or password"});
    }
    // generate jwt token for the user
    const token = generateToken(user._id);

    // adding the token to the cookie for the user for future
    //  authentication and authotization
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // false because it is not in production so it is set to false for development
      sameSite: 'strict', // to prevent csrf(security)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.Role
      },
    });
  } catch (err) {
    console.log("error during login", err);
    return res.status(500).json({message: "Internal Error!"});
  }
};

// Logout Logic function
export const LogoutUser = async (_req, res) => {
  try {
    res.clearCookie('authToken');
    return res.status(200).json({message: "Logout Successfully"});
  } catch (error) {
    console.error("Error during logout", error);
    return res.status(500).json({message: "Internal Error!"});
  }
};

export const GetUserProfile = async (req, res) => {
  res.status(200).json({message: "Profile data",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.Role
    }
  });
};