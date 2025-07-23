import express from "express";
import {
  registerUser,
  LoginUser,
  LogoutUser,
  GetUserProfile,
} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import { createProduct, } from "../controllers/productController.js";

const router = express.Router();

// Routes for user
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", authenticateToken, LogoutUser);
router.get("/profile", authenticateToken, GetUserProfile);

// Routes for admin
router.post("/products", authenticateToken, isAdmin, createProduct);
// router.delete("/product/:deleteProductId", authenticateToken, isAdmin, deleteOneProduct);
router.get("/admin/dashboard", authenticateToken, isAdmin, (_req, res) => {
    res.status(200).json({message: "Admin dashboard access successful"});
});

// Add user dashboard route
router.get("/user/dashboard", authenticateToken, (req, res) => {
    if (req.user.Role !== "user") {
        return res.status(403).json({ message: "Access denied. User role required." });
    }
    res.status(200).json({message: "User dashboard access successful"});
});

export default router;