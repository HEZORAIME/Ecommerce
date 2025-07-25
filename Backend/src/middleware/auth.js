import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from cookies to be used for authentication
    const token = req.cookies.ec_user;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Acces denied. No token provided." });
    }
    // verify the token so that the user can access the protected routes
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // find and get the user from the database to check if the user is valid or not
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // if the user is valid then we can access the protected routes
    req.user = user;
    next();
  } catch (error) {
    console.error("error during authentication", error);
    return res.status(500).json({ message: "Invalid token!" });
  }
};

// check if the user is admin or not if it is not admin then
//  we can not access the protected routes
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.Role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};
export const isUser = (req, res, next) => {
  if(!req.user || req.user.Role !== "user") {
    return res.status(403).json({message: "Access denied. User role required."})
  }
  next();
}