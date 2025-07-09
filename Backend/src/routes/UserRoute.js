import express from "express";
import {
  registerUser,
  LoginUser,
  LogoutUser,
  GetUserProfile,
} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", authenticateToken, LogoutUser);
router.get("/profile", authenticateToken, GetUserProfile);



router.get("/admin/dashboard", authenticateToken, isAdmin, (_req, res) => {
    res.status(200).json({message: "Admin dashboard access successful"});
});

export default router;
