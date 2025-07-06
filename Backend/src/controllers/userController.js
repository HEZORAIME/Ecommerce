// import User from '../models/User.js';

// // to hash passwords
// import bcrypt from 'bcrypt';


// export const registerUser = async (req, res) => {
//     const {name, email, password, Role} = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser.length > 0) {
//             return res.status(400).json({message: "User Already Exists!"})
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             Role: Role || 'user' // default role is user
//         })
//         res.status(201).json({
//             message: 'User Registered Successfully!'
//         })
//     } catch (error) {
//         console.error("error in registering user", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         })
//     }
// }


import User from '../models/User.js';
import bcrypt from 'bcrypt';
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
      Role: Role || 'user'
    });

    await newUser.save();

    // Respond with success
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({
      message: "Something went wrong during registration.",
      error: err.message
    });
  }
};
