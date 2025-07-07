import express from 'express';
import { registerUser, LoginUser } from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser)
router.post('/Login', LoginUser)

export default router;