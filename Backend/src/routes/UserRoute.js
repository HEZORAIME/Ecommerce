import express from 'express';
import { registerUser, LoginUser, LogoutUser, GetUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes
router.post('/register', registerUser)
router.post('/login', LoginUser)
router.post('/logout', authenticateToken, LogoutUser)
router.get('/profile',authenticateToken, GetUserProfile)

export default router;