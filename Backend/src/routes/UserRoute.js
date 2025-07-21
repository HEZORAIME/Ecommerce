import express from "express";
import {
  registerUser,
  LoginUser,
  LogoutUser,
  GetUserProfile,
} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

// Routes for user
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", authenticateToken, LogoutUser);
router.get("/profile", authenticateToken, GetUserProfile);

router.post("/products/:productId/reviews", authenticateToken, addProductReview);

// Routes for admin
router.post("/products", authenticateToken, isAdmin, createProduct);

router.get("/admin/dashboard", authenticateToken, isAdmin, (_req, res) => {
    res.status(200).json({message: "Admin dashboard access successful"});
});

export default router;
