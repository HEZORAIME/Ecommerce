import express from 'express';
import { registerUser } from '../controllers/userController';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser)