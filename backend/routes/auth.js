import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// @route    POST /register
// @desc     Register user
router.post('/register', register);

// @route    POST /login
// @desc     Authenticate user and get token
router.post('/login', login);

export default router;
